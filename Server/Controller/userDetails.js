const router = require('express').Router()
// const jwt = require('jsonwebtoken')
const verifyToken = require('../Middleware/verifyToken')
const userDetails = require('../Models/userDetailsSchema')
const ObjectId = require('mongodb').ObjectId
router.get('/profile', verifyToken, (req, res) => {
  const token = req.token.id
  userDetails.find({ _id: token }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})
router.get('/friends', verifyToken, (req, res) => {
  const token = req.token.id
  userDetails.aggregate([
    {
      $match: { $expr: { $ne: ['$_id', ObjectId(token)] } }
    },
    {
      $sort: { sFname: 1 }
    }
  ], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})
router.post('/friendsDetail', (req, res) => {
  const id = req.body.id
  const userName = req.body.userName
  userDetails.find({ $or: [{ sUname: userName }, { _id: id }] }
    , (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send(result)
      }
    })
})
router.post('/editProfile', verifyToken, (req, res) => {
  const sFname = req.body.sFname
  const sLname = req.body.sLname
  const sGender = req.body.sGender
  const sUname = req.body.sUname
  const nMob = req.body.nMob
  const sEmail = req.body.sEmail
  const id = req.token.id
  userDetails.updateMany({ _id: id }, { sFname: sFname, sLname: sLname, sGender: sGender, sUname: sUname, nMob: nMob, sEmail: sEmail }, (err, result) => {
    if (err) {
      res.send({ err })
    } else {
      res.send({ message: 'Data Updated' })
    }
  })
})

module.exports = router
