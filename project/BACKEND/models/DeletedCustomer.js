const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deletedCustomerSchema = new Schema({
    fname: String,
    lname: String,
    username: String,
    nic: String,
    no: String,
    street: String,
    city: String,
    phone: String,
    // Add any other fields you want to store for deleted customers
    /* For example:
    email: String,
    dateOfBirth: Date,
    gender: String,
    */
    deletedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'deletedcustomers2' // Specify the custom collection name here
});

const DeletedCustomer = mongoose.model('DeletedCustomer', deletedCustomerSchema);

module.exports = DeletedCustomer;