const path = require('path')
const multer = require("multer")
const uploadPath = path.join(__dirname, '../uploads');


// multer configuration

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const upload = multer({ storage });

module.exports = { upload }