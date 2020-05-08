const mongoose = require('mongoose')

const userDetails = new mongoose.Schema({
  sFname: {
    type: String,
    required: true
  },
  sLname: {
    type: String,
    required: true
  },
  nMob: {
    type: Number,
    required: true
  },
  sEmail: {
    type: String,
    required: true
  },
  sHobbies: {
    type: [String]
  },
  sGender: {
    type: String,
    required: true
  },
  sUname: {
    type: String,
    required: true
  },
  sPass: {
    type: String,
    required: true
  }
})
const userRegistration = mongoose.model('userRegistration', userDetails)
module.exports = userRegistration
