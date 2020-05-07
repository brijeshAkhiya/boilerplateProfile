const router = require('express').Router()
const bcrypt = require('bcrypt')
const userDetails = require('../../Models/userDetails')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
router.post('/login',
  [
    check('sUname').not().isEmpty().withMessage('Please write username'),
    check('sPass').not().isEmpty().withMessage('Please write password')
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.send({ errors })
    } else {
      const sUname = req.body.sUname
      const sPass = req.body.sPass
      userDetails.findOne({ sUname: sUname }, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          if (result === null) {
            res.send({ message: 'Username Does\'nt exist' })
          } else {
            const x = bcrypt.compareSync(sPass, result.sPass)
            if (x) {
              const token = jwt.sign({ id: result._id }, 'secretKey')
              res.send({ token })
            } else {
              res.send({ message: 'Password Incorrect' })
            }
          }
        }
      })
    }
  })
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
          console.log(err)
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
module.exports = router
