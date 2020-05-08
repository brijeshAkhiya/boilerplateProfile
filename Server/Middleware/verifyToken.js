const jwt = require('jsonwebtoken')
// eslint-disable-next-line no-undef
verifyToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
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
// eslint-disable-next-line no-undef
module.exports = verifyToken
