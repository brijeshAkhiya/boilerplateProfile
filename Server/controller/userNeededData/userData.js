const router = require('express').Router()
const verifyToken = require('../../Middleware/verifyToken')
const userDetails = require('../../Models/userDetails')
router.get('/profile', verifyToken, (req, res) => {
  const token = req.token.id
  userDetails.find({ _id: token }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result == null) {
        res.send({ message: 'Please try again later' })
      } else {
        res.send(result)
      }
    }
  })
})
module.exports = router
