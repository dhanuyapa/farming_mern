const jwt = require('jsonwebtoken');
const router = require("express").Router();
let Farmer = require("../models/Farmer");
const bcrypt = require('bcrypt');



router.route('/login').post(async (req, res) => {
    try {
       
        const { phone, password } = req.body;
        console.log('Received phone:', phone);

        // Find the user by phone number
        const farmer = await Farmer.findOne({ phone }).select('+password');
        console.log('Found user:', farmer);

        if (!farmer) {
            console.log('User not found');
            return res.status(404).json({ status: 'User not found' });
        }

        // Check if the provided password matches the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, farmer.password);
        console.log('Password match:', passwordMatch);

        if (!passwordMatch) {
            console.log('Authentication failed');
            return res.status(401).json({ status: 'Authentication failed' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Adjust the token expiration time as needed
        });

        res.status(200).json({ status: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error with login', error: error.message });
    }
});
router.route('/add').post(async (req, res) => {
    try {
        const {
            fname,
            lname,
            nic,
            no,
            street2,
            district,
            province,
            phone,
            password, // Plain text password from the request
            landOwnerName,
            districtCode,
            devisionCode,
            blockNo,
            feildSize,
            MPACode
        } = req.body;

        // Hash the password before saving it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newFarmer = new Farmer({
            fname,
            lname,
            nic,
            no,
            street2,
            district,
            province,
            phone,
            password: hashedPassword, // Save the hashed password
            landOwnerName,
            districtCode,
            devisionCode,
            blockNo,
            feildSize,
            MPACode
        });

        await newFarmer.save();

        res.json('Customer Registration Successful');
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error with registration', error: error.message });
    }
});

router.route("/").get((req,res)=>{

   Farmer.find().then((farmers)=>{
        res.json(farmers)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res) => {
    try {
        const farmerId = req.params.id;
        const {
            fname,
            lname,
            nic,
            no,
            street2,
            district,
            province,
            phone,
            password, // Include password in destructuring
            landOwnerName,
            districtCode,
            devisionCode,
            blockNo,
            feildSize,
            MPACode
        } = req.body;

        const updateFarmer = {
            fname,
            lname,
            nic,
            no,
            street2,
            district,
            province,
            phone,
            password, // Assign the value from the request body
            landOwnerName,
            districtCode,
            devisionCode,
            blockNo,
            feildSize,
            MPACode
        };

        const updatedFarmer = await Farmer.findByIdAndUpdate(farmerId, updateFarmer);

        if (!updatedFarmer) {
            return res.status(404).send({ status: "Farmer not found" });
        }

        res.status(200).send({ status: "Farmer updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});
router.route("/delete/:id").delete(async (req, res) => {
    let farmerId = req.params.id;
await Farmer.findByIdAndDelete(farmerId).then(() =>{
    res.status(200).send({status: "farmer deleted"});
}).catch((err) =>{
    console.log(err.message);
    res.status(500).send({status: "Error with delete", error: err.message});
});
});
router.route("/get/:id").get(async (req, res) => {
    let farmerId = req.params.id;
    const farmer = await Farmer.findById(farmerId)
        .then((farmer) => {
            res.status(200).send({ status: "farmer fetched", farmer });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });
        });
});
module.exports = router;