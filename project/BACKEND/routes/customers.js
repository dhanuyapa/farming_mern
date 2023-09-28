const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

let Customer = require("../models/Customer");
const DeletedCustomer = require('../models/DeletedCustomer');


// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: 'uploads/', // Directory where uploaded images will be stored
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename uploaded file with a unique name
    },
  });
  
  const upload = multer({ storage });
  
  // Add a route to handle image uploads
  router.post("/register/uploadProfileImage/:nic", upload.single("profileImage"), async (req, res) => {
    try {
      const nic = req.params.nic;
      const imageUrl = req.file.path; // This should be the URL where the image is stored
  
      // Update the profileImage field in the Customer document
      await Customer.findOneAndUpdate({ nic }, { profileImage: imageUrl });
  
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error uploading image', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });



/*

router.route("/register").post((req,res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    //const dob = req.body.dob;
    const nic = req.body.nic;
    //const gender = req.body.gender;
    const no = req.body.no;
    const street = req.body.street;
    const district = req.body.district;
    const phone = req.body.phone; 
    //const password = req.body.password;

    const salt = await bcrypt.genSalt(10); // Generate a salt (rounds: 10 is a common value)
    const hashedPassword = await bcrypt.hash(password, salt);

    const confirmPassword = req.body.confirmPassword;

    const landOwnerName = req.body.landOwnerName;
    const province = req.body.province;
    const districtCode = req.body.districtCode;
    const devisionCode = req.body.devisionCode;
    const blockNo = req.body.blockNo;
    const feildSize = req.body.feildSize;
    //const MPACode = req.body.MPACode;

    const newCustomer = new Customer({
        fname,
        lname,
        username,
        //dob,
        nic,
        //gender,
        no,
        street,
        district,
        phone,
        password: hashedPassword,
        confirmPassword,

        landOwnerName,
        province,
        districtCode,
        devisionCode,
        blockNo,
        feildSize,
        //MPACode
    })

    newCustomer.save().then(()=>{

        res.json("Customer Registration Successful")

    }).catch((err)=>{
        console.log(err);
    })
})

*/


//newly registered one
router.route("/register").post(async (req, res) => { // Mark this function as async
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const nic = req.body.nic;
    const no = req.body.no;
    const street = req.body.street;
    const city = req.body.city;
    const phone = req.body.phone; 
    const password = req.body.password;
    //const confirmPassword = req.body.confirmPassword;

    const landOwnerName = req.body.landOwnerName;
    const province = req.body.province;
    const districtCode = req.body.districtCode;
    const devisionCode = req.body.devisionCode;
    const blockNo = req.body.blockNo;
    const feildSize = req.body.feildSize;

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const newCustomer = new Customer({
            fname,
            lname,
            username,
            nic,
            no,
            street,
            city,
            phone,
            password: hashedPassword, // Store the hashed password in the database
            //confirmPassword,
            landOwnerName,
            province,
            districtCode,
            devisionCode,
            blockNo,
            feildSize,
        });

        await newCustomer.save(); // Save the new customer with hashed password

        res.json("Customer Registration Successful");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});






router.route("/fetch").get((req,res)=>{

    Customer.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/updateCus/:nic").put(async(req,res)=> {

    let Nic = req.params.nic;
    const {fname, lname, nic, username, phone, no, street, city, password, landOwnerName, province, districtCode, devisionCode, blockNo, feildSize } = req.body;

    const updateCustomer = {
        fname,
        lname,
        username,
        //dob,
        nic,
        //gender,
        no,
        street,
        city,
        phone,
        password,
        //confirmPassword,
        landOwnerName,
        province,
        districtCode,
        devisionCode,
        blockNo,
        feildSize,
        //MPACode
    }

    const update = await Customer.findOneAndUpdate({ nic: Nic }, updateCustomer).then(()=> {

        res.status(200).send({status: "Customer Updated successfully"})

    }).catch((err)=> {

        console.log(err);
        res.status(500).send({status: "Error with updating data"});

    })  
})

/*
router.route("/delete/:nic").delete(async(req,res)=> {

    let Nic = req.params.nic;

    await Customer.findOneAndDelete({ nic: Nic }).then(()=> {

        res.status(200).send({status: "Customer Deleted successfully"});

    }).catch((err)=> {

        console.log(err.message);
        res.status(500).send({status: "Error with delete customer", error: err.message});

    })
})
*/

//previous delete route is above 


router.route('/deleteCus/:nic').delete(async (req, res) => {
    const nic = req.params.nic;

    try {
        // Step 1: Find the customer account by NIC
        const customerToDelete = await Customer.findOne({ nic });

        if (!customerToDelete) {
            return res.status(404).json({ status: 'Customer not found' });
        }

        // Step 2: Remove the customer account from the existing table
        await Customer.findOneAndDelete({ nic });

        // Step 3: Save the removed customer account to the new table (e.g., "deleted_accounts")
        const deletedCustomer = new DeletedCustomer(customerToDelete.toObject()); // Create a new instance of DeletedCustomer

        await deletedCustomer.save(); // Save the customer to the "deleted_accounts" table

        res.status(200).json({ status: 'Customer Deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'Error with delete customer', error: err.message });
    }
});


router.route("/getUser/:nic").get(async(req,res)=> {

    let Nic = req.params.nic;

    const cus = await Customer.findOne({ nic: Nic }).then((customer)=> {

        res.status(200).send({status: "Customer fetched", customer})

    }).catch((err)=> {

        console.log(err.message);
        res.status(500).send({status: "Error with customer", error: err.message});

    })
})


//newly registered login route
// New login route that checks for admin credentials
router.route("/loginCus").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user is an admin
    if (username === "11111111" && password === "12345678@") {
      // Admin login successful
      const adminToken = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET);
      return res.status(200).json({ message: "Admin login successful", token: adminToken });
    }

    // For regular users, check the database
    const user = await Customer.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate and return a JWT token for regular users
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: `${username} login successfully`, nic: user.nic, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/*
    // Update profile image
    router.put("/updateProfileImage/:nic", upload.single("profileImage"), async (req, res) => {
        try {
          const nic = req.params.nic;
          const imageUrl = req.file.path; // This should match the directory specified in your .env
      
          // Update the profileImage field in the Customer document
          await Customer.findOneAndUpdate({ nic }, { profileImage: imageUrl });
      
          // Update the user's profile image URL in local storage
          localStorage.setItem('userProfileImage', imageUrl);
      
          res.json({ imageUrl });
        } catch (error) {
          console.error('Error updating image', error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      });

      */



// Route to update or remove profile image
router.put("/updateProfileImage/:nic", upload.single("profileImage"), async (req, res) => {
  try {
    const nic = req.params.nic;
    const imageUrl = req.file ? req.file.path : null; // Check if an image was uploaded

    // Update the profileImage field in the Customer document
    await Customer.findOneAndUpdate({ nic }, { profileImage: imageUrl });

    // Update the user's profile image URL in local storage
    if (imageUrl) {
      localStorage.setItem(`userProfileImage_${nic}`, imageUrl);
    } else {
      // If imageUrl is null, remove the existing image URL from local storage
      localStorage.removeItem(`userProfileImage_${nic}`);
    }

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error updating image', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;