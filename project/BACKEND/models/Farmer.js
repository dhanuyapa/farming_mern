const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');



const farmerSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    no: {
        type: String,
        required: true
    },
    street2: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        // Exclude this field from default query results
    },
    landOwnerName: {
        type: String,
        required: true
    },
    districtCode: {
        type: String,
        required: true
    },
    devisionCode: {
        type: String,
        required: true
    },
    blockNo: {
        type: String,
        required: true
    },
    feildSize: {
        type: Number,
        required: true
    },
    MPACode: {
        type: String,
        required: true
    }
});


const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
