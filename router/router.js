const express = require("express");
const router = express.Router();
const { upload } = require('../helper/multer');
const { testApi, uploadFile, getAllFiles, deletemanyFiles, deleteSingleFile, getFilesDataById } = require("../controllers/controllers")

// Route for testing the API
router.get('/testing', testApi);
router.get('/files/:userEmail/all', getAllFiles);
router.get('/files/:fileId', getFilesDataById)
router.delete('/files/delete/multiple', deletemanyFiles);
router.delete('/files/delete/single/:fileId', deleteSingleFile)
router.post("/upload", upload.single('audio'), uploadFile);

module.exports = router; 
