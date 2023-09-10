const express = require("express");
const mongoose = require("mongoose");
const bodyPareser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyPareser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})
const farmerRouter = require("./routes/farmers.js");
app.use("/farmer",farmerRouter);


app.listen(PORT, () => {
    console.log(`Server is up and runing on port number: ${PORT}`)
})