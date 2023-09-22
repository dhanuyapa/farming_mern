const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
})

// Include your customer routes here
const customerRoutes = require('./routes/customers');
app.use('/customer', customerRoutes); // Mount the customer routes under /customer

// Start the server
const port = process.env.PORT || 8070;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});