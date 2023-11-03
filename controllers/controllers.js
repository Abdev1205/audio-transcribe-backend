const fs = require("fs")
const files = require("../models/files")
const path = require('path');
const { speechToText } = require("../helper/speechToText")
const { dateModifiers } = require('../utils/dateModifiers')



// Function for testing the API
const testApi = async (req, res, next) => {
  res.status(200).json('Welcome to my API');
};

// Define the controller functions
const uploadFile = async (req, res, next) => {
  try {
    console.log(typeof (req.body.saved));
    console.log(req)
    console.log(req.body.saved)
    const userFilePath = req.file.path;
    console.log(userFilePath)
    const currentDate = new Date();
    const date = dateModifiers(currentDate);
    console.log(date)
    console.log('Received POST request at /api/upload', userFilePath);
    var saved = req.body.saved;

    const { transcript, transcribe } = await speechToText(userFilePath, saved);
    response = transcript;


    console.log(response);
    const data = new files({
      name: req.body.name,
      userEmail: req.body.userEmail,
      fileType: req.file.mimetype,
      filePath: userFilePath,
      duration: "3min 5sec",
      dateCreated: date,
      transcribed: transcribe,
      saved: saved,
      response: response?.text,
    });
    const serverResponse = await data.save();
    const test = req.body.saved;

    res.json({ message: 'File uploaded successfully', response, serverResponse, test: "this is test", test });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Function to fetch all stages within a specific board
const getAllFiles = async (req, res, next) => {
  try {
    const userEmail = req.params.userEmail
    console.log(userEmail)
    const filesData = await files.find({ userEmail: userEmail });

    res.status(200).json({ message: 'All files fetched successfully', filesData: filesData });
  } catch (error) {
    console.error('Error fetching files :', error.message);
    res.status(500).json(error.message);
  }
};

const getFilesDataById = async (req, res, next) => {
  try {
    const fileId = req.params.fileId;
    console.log(fileId)
    const filesData = await files.findById(fileId);

    if (!filesData) {
      // If the file with the given ID is not found, return a 404 status code
      return res.status(404).json({ message: 'file not found' });
    }

    // If the file is found, send its data as a JSON response
    res.status(200).json({ message: 'file data fetched successfully', filesData });
  } catch (error) {
    console.error('Error fetching file data by ID:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deletemanyFiles = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log("I am in delete multiple ");
    console.log(ids);

    // Ensure ids is an array
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'ids must be an array' });
    }

    // const objectIds = ids.map(id => mongoose.Types.ObjectId(id));
    // console.log(objectIds);

    // Use the Mongoose `deleteMany` method to delete files with matching IDs
    const result = await files.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Files deleted successfully' });
    } else {
      res.status(404).json({ error: 'No files were deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteSingleFile = async (req, res) => {
  try {
    const fileId = req.body.fileId; // Get the file ID from the request body

    if (!fileId) {
      return res.status(400).json({ error: 'fileId must be provided in the request body' });
    }

    // Use files.deleteOne to delete the file by ID
    const result = await files.deleteOne({ _id: fileId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error.message);
    res.status(500).json(error.message);
  }
};





module.exports = { testApi, uploadFile, getAllFiles, deletemanyFiles, deleteSingleFile, getFilesDataById };