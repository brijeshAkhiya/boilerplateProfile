const jwt = require('jsonwebtoken')
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef
const verifyToken = (req, res, next) => {
  const x = req.header('Authorization')
  jwt.verify(x, 'secretKey', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      req.token = result
    }
  })
  next()
}
module.exports = verifyToken
