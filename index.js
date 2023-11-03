require('dotenv').config();
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDb = require('./Db/connect');
const routes = require('./router/router');
const PORT = process.env.PORT || 4000;


// adding middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes)
// Serve uploaded files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));



app.listen(PORT, () => {
  console.log(`server is listening to ${PORT} port`);
})



const databaseConnection = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.get("/", (req, res) => {
      res.send("Hi Welcome saydata Backend")
    })

  } catch (error) {
    console.log(error);
  }
}
databaseConnection();

// module.exports = { openAiConstructor, upload }


