const mongoose = require("mongoose");
const filesSchema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
  },
  filePath: {
    type: String,
  },
  duration: {
    type: String,
  },
  dateCreated: {
    type: Date,
    required: true
  },
  transcribed: {
    type: Boolean,
  },
  saved: {
    type: String,
  },
  response: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('files', filesSchema);