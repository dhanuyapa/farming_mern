const mongoose =  require('mongoose');
const Scheema = mongoose.Schema;
const farmerSchema = new Schema({

    fname : {
        type : String,
        required: true
    },

    lname : {
        type : String,
        required: true
    },

  

    nic : {
        type : String,
        required: true
    },


    no : {
        type : String,
        required: true
    },

  

    street2 : {
        type : String,
        required: true
    },

    district : {
        type : String,
        required: true
    },

    province : {
        type : String,
        required: true
    },

    phone : {
        type : String,
        required: true
    },
   

    landOwnerName : {
        type : String,
        required: true
    },

    /*
    deedNo : {
        type : String,
        required: true
    },
    */
    districtCode : {
        type : String,
        required: true
    },

    devisionCode : {
        type : String,
        required: true
    },

    blockNo : {
        type : String,
        required: true
    },

    feildSize : {
        type : Number,
        required: true
    },

    MPACode : {
        type : String,
        required: true
    }
})