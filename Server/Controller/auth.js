const router = require('express').Router()
const userDetails = require('../Models/userDetailsSchema')
const bcrypt = require('bcrypt')
const verifyToken = require('../Middleware/verifyToken')
// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const { auth: { service, user, pass } } = require('../Config/config')
const transport = nodeMailer.createTransport({
  service: service,
  auth: {
    user: user,
    pass: pass
  }
})
const { check, validationResult } = require('express-validator')
router.post('/signup',
  [
    check('sFname').not().isEmpty().withMessage('Please write First Name'),
    check('sLname').not().isEmpty().withMessage('Please write Lase Name'),
    check('nMob').not().isEmpty().withMessage('Please write Mobile Number'),
    check('sEmail').not().isEmpty().withMessage('Please write Email Id'),
    check('sUname').not().isEmpty().withMessage('Please write User Name'),
    check('sPass').not().isEmpty().withMessage('Please write Password'),
    check('sEmail').isEmail().normalizeEmail()
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.send(errors)
    } else {
      const salt = bcrypt.genSaltSync(10)
      const pass = bcrypt.hashSync(req.body.sPass, salt)
      const tempObj = {
        sFname: req.body.sFname,
        sLname: req.body.sLname,
        nMob: req.body.nMob,
        sEmail: req.body.sEmail,
        sUname: req.body.sUname,
        sHobbies: req.body.sHobbies,
        sGender: req.body.sGender,
        sPass: pass
      }
      userDetails.findOne({ sUname: tempObj.sUname }, (err, result) => {
        if (err) {
          res.send({ err })
        }
        if (result == null) {
          userDetails.insertMany(tempObj)
          res.send({ message: 'Registered' })
        } else {
          res.send({ message: 'User Already Registered' })
        }
      })
    }
  })
router.post('/login',
  [
    check('sUname').not().isEmpty().withMessage('Please Write User Name'),
    check('sPass').not().isEmpty().withMessage('Please Write Password')
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
      res.send(errors)
      console.log(errors)
    } else {
      const sUname = req.body.sUname
      const sPass = req.body.sPass
      userDetails.findOne({ sUname: sUname }, (err, result) => {
        if (err) {
          console.log(err)
        }
        if (result == null) {
          res.send({ message: "Username doesn't exist" })
        } else {
          const enpassword = bcrypt.compareSync(sPass, result.sPass)
          if (enpassword) {
            const token = jwt.sign({ id: result._id }, 'secretKey')
            res.json({ token: token })
          } else {
            res.json({ message: 'Password Incorrect' })
          }
        }
      })
    }
  })

router.post('/changePassword', verifyToken, [
  check('sPass').not().isEmpty().withMessage('Please Write Password'),
  check('scnPass').not().isEmpty().withMessage('Please Write Password')], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty) {
    res.send(errors)
    console.log(errors)
  } else {
    const sPass = req.body.sPass
    const scnPass = req.body.scnPass
    const salt = bcrypt.genSaltSync(10)
    const pass = bcrypt.hashSync(scnPass, salt)
    const id = req.token.id
    userDetails.findOne({ _id: id }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        const enpassword = bcrypt.compareSync(sPass, result.sPass)
        if (enpassword) {
          userDetails.updateMany({ _id: id }, { sPass: pass }, (err, result) => {
            if (err) {
              res.send({ err })
            } else {
              res.send({ message: 'Password Changed' })
            }
          })
        } else {
          res.send({ message: 'Password Incorrect' })
        }
      }
    })
  }
})
router.post('/resetPasswordLink', (req, res) => {
  const sEmail = req.body.sEmail
  const eToken = jwt.sign({ id: sEmail }, 'secretKey')
  const array = eToken.split('.')
  const url = `http://localhost:4200/changepassword/${array[1]}`
  userDetails.findOne({ sEmail: sEmail }, (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result === null) {
      res.send({ message: 'Email Incorrect' })
    } else {
      transport.sendMail({
        from: user,
        to: sEmail,
        html: `Go to this link to reset your password ${url}`
      }).then(res.send({ eToken })).catch({ message: 'mail not sent' })
    }
  })
})
router.post('/resetPassword', verifyToken, [
  check('sPass').not().isEmpty().withMessage('Please Write Password')], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty) {
    res.send({ errors })
    console.log(errors)
  } else {
    const sPass = req.body.sPass
    const salt = bcrypt.genSaltSync(10)
    const pass = bcrypt.hashSync(sPass, salt)
    const sEmail = req.token.id
    userDetails.updateOne({ sEmail: sEmail }, { sPass: pass }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result == null) {
          res.send({ message: 'Please try again!' })
        } else {
          console.log(sEmail)
          res.send({ message: 'Password Changed' })
        }
      }
    })
  }
})
module.exports = router
