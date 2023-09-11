import React, { useState } from "react";
import "./styles.css";

export default function AddFarmer() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dob, setDOB] = useState("");
    const [nic, setNic] = useState("");
    const [gender, setGender] = useState("");
    
    // Uncomment these lines if you intend to use them
    // const [address, setAddress] = useState("");
    
    /* Newly added variables */
    const [no, setNo] = useState("");
    const [street2, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [phone, setPhone] = useState("");
    const [landOwnerName, setLandOwnerName] = useState("");
    // const [deedNo, setDeedNo] = useState("");
    const [districtCode, setDistrictCode] = useState("");
    const [devisionCode, setDivisionCode] = useState("");
    const [blockNo, setBlockNumber] = useState("");
    const [feildSize, setSize] = useState("");
    const [MPACode, setMpaCode] = useState("");

    
    function sendData(e) {

        e.preventDefault();
        
        const newCustomer = {
            fname,
            lname,
            dob,
            nic,
            gender,
            //address,
            no,
            street2,
            district,
            province,
            phone,
            landOwnerName,
            //deedNo,
            districtCode,
            devisionCode,
            blockNo,
            feildSize,
            MPACode
        }}

   
        return (
     
            <div class="container">
                <center><h2>Register</h2></center><br/>
                <form method="POST" onSubmit={sendData}>
                    <div class="section">
                        <h3>Personal Details</h3>
                        
                        <div className="input-group">
                        <label htmlFor="fname">First Name</label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            title="Enter only letters"
                            required
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^[A-Za-z]*$/.test(input)) {
                                    setFname(input);
                                }
                            }}
                            onKeyPress={(e) => {
                                const charCode = e.charCode;
                                if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        </div>
        
                        <div className="input-group">
                        <label htmlFor="lname">Last Name</label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            title="Enter only letters"
                            required
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^[A-Za-z]*$/.test(input)) {
                                    setLname(input);
                                }
                            }}
                            onKeyPress={(e) => {
                                const charCode = e.charCode;
                                if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        </div>
        
                        <div className="input-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            required
                            min="1950-01-01"
                            max={new Date().toISOString().split('T')[0]} // Set the maximum value to the current date
                            onChange={(e) => {
                                setDOB(e.target.value);
                            }}
                        />
                        </div>
        
                        
                        <div className="input-group">
                        <label htmlFor="nic">NIC (13 characters)</label>
                        <input
                            type="text"
                            id="nic"
                            name="nic"
                            pattern="^(?:\d{12}|\d{12}[Vv])$"
                            title="Enter exactly 12 numbers or 12 numbers followed by 'V'/'v'"
                            required
                            value={nic}
                            onChange={(e) => {
                                 const input = e.target.value;
                                 if (/^\d{0,12}[Vv]?$/.test(input)) {
                                    setNic(input);
                                }
                            }}
                        />
                        </div>
        
                        
                        <div class="input-group">
                            <label>Gender</label>
                            <label for="male">Male</label>
                            <input type="radio" id="male" name="gender" value="male" onChange = {(e)=> {
        
                                setGender(e.target.value);
        
                            }} />
                            <label for="female">Female</label>
                            <input type="radio" id="female" name="gender" value="female" onChange = {(e)=> {
        
                                setGender(e.target.value);
        
                            }} />
                        </div>
        
                       {/*
                        <div class="input-group">
                            <label for="address">Address</label>
                            <textarea id="address" name="address" required onChange = {(e)=> {
        
                                setAddress(e.target.value);
        
                            }} >
                            </textarea>
                        </div>
                        
                        */}
        
                        {/*new code for address*/}
        
        
                        <div class="input-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="no"
                                name="no"
                                placeholder="No"
                                required
                                onChange={(e) => {
                                    let input = e.target.value;
                                    // Remove extra '/' characters
                                    input = input.replace(/\/+/g, '/');
                                    // Check if input length is greater than 8 (4 digits for x and 4 digits for y)
                                    if (input.length > 8) {
                                        // Truncate the input to 8 characters
                                        input = input.slice(0, 8);
                                    }
                                    setNo(input);
                                }}
                                onKeyPress={(e) => {
                                    const charCode = e.charCode;
                                    const input = e.target.value;
                                    
                                    if (charCode >= 48 && charCode <= 57) {
                                        // If it's a digit (0-9)
                                        if (input.indexOf('/') === -1) {
                                            // No '/' in the input, allow up to 4 digits
                                            if (input.length >= 4) {
                                                e.preventDefault();
                                            }
                                        } else {
                                            // '/' is present, split and check each part
                                            const parts = input.split('/');
                                            if (parts.length === 2) {
                                                if (parts[0].length >= 4 || parts[1].length >= 4) {
                                                    e.preventDefault();
                                                }
                                            } else {
                                                e.preventDefault();
                                            }
                                        }
                                    } else if (charCode === 47) {
                                        // '/' character
                                        if (input.indexOf('/') !== -1) {
                                            // '/' is already present, prevent entering another '/'
                                            e.preventDefault();
                                        }
                                    } else {
                                        e.preventDefault(); // Prevent other characters
                                    }
                                }}
                            />
                            <br></br>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Street"
                                required
                                onChange={(e) => {
                                    let input = e.target.value;
                                    input = input.replace(/[^A-Za-z\s]/g, '');
                                    if (input.length > 50) {
                                        input = input.slice(0, 50);
                                    }
                                    setStreet(input);
                                }}
                                onKeyPress={(e) => {
                                    const charCode = e.charCode;
                                    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            <br></br>
                            <select
                                id="district"
                                name="district"
                                required
                                onChange={(e) => {
                                    setDistrict(e.target.value);
                                }}
                            >
                                <option value="" disabled selected>Select District</option>
                                <option value="Ampara">Ampara</option>
                                <option value="Anuradhapura">Anuradhapura</option>
                                <option value="Badulla">Badulla</option>
                                <option value="Batticaloa">Batticaloa</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Galle">Galle</option>
                                <option value="Gampaha">Gampaha</option>
                                <option value="Hambantota">Hambantota</option>
                                <option value="Jaffna">Jaffna</option>
                                <option value="Kalutara">Kalutara</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Kegalle">Kegalle</option>
                                <option value="Kilinochchi">Kilinochchi</option>
                                <option value="Kurunegala">Kurunegala</option>
                                <option value="Mannar">Mannar</option>
                                <option value="Matale">Matale</option>
                                <option value="Matara">Matara</option>
                                <option value="Monaragala">Monaragala</option>
                                <option value="Mullaitivu">Mullaitivu</option>
                                <option value="Nuwara Eliya">Nuwara Eliya</option>
                                <option value="Polonnaruwa">Polonnaruwa</option>
                                <option value="Puttalam">Puttalam</option>
                                <option value="Ratnapura">Ratnapura</option>
                                <option value="Trincomalee">Trincomalee</option>
                                <option value="Vavuniya">Vavuniya</option>
                            </select>
                            <br></br>
                            <select
                                id="province"
                                name="province"
                                required
                                onChange={(e) => {
                                    setProvince(e.target.value);
                                }}
                            >
                                <option value="" disabled selected>Select Province</option>
                                <option value="Central">Central</option>
                                <option value="Eastern">Eastern</option>
                                <option value="North Central">North Central</option>
                                <option value="Northern">Northern</option>
                                <option value="North Western">North Western</option>
                                <option value="Sabaragamuwa">Sabaragamuwa</option>
                                <option value="Southern">Southern</option>
                                <option value="Uva">Uva</option>
                                <option value="Western">Western</option>
                                                    
                            </select>
                        </div>
        
        
        
                        <div className="input-group">
                        <label htmlFor="phone">Phone (10 numbers)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            maxLength="10"
                            title="Enter a number that starts with 0 and has 9 additional digits"
                            required
                            onKeyPress={(e) => {
                                const charCode = e.charCode;
                                const currentValue = e.target.value;
                    
                                if (currentValue.length === 0 && charCode !== 48) { 
                                    e.preventDefault();
                                } else if (currentValue.length > 0 && (charCode < 48 || charCode > 57)) {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^[0-9]*$/.test(input) && input.length <= 10) {
                                    setPhone(input);
                                }
                            }}
                        />
                        </div>
                        </div>
                        <div class="section">
                        <h3>Field Details</h3>
                            
                        <div className="input-group">
                        <label htmlFor="landOwnerName">Land Owner Name</label>
                        <input
                            type="text"
                            id="landOwnerName"
                            name="landOwnerName"
                            required
                            onKeyPress={(e) => {
                                const charCode = e.charCode;
                                if (
                                    (charCode < 65 || charCode > 90) && // A-Z
                                    (charCode < 97 || charCode > 122) && // a-z
                                    charCode !== 32 // space
                                ) {
                                e.preventDefault();
                                }
                            }}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^[A-Za-z\s]*$/.test(input)) {
                                setLandOwnerName(input);
                                }
                            }}
                        />
                        </div>
        
        
                        {/*
                        <div class="input-group">
                            <label for="deedNo">Deed Number</label>
                            <input type="text" id="deedNo" name="deedNo" required onChange = {(e)=> {
        
                                setDeedNo(e.target.value);
        
                            }} />
                        </div>
                        */}
        
                        <div className="input-group">
                        <div><label>Deed Number</label></div><br></br>
                        <label htmlFor="districtCode">District Code</label>
                        <select
                            id="districtCode"
                            name="districtCode"
                            required
                            onChange={(e) => {
                            setDistrictCode(e.target.value);
                            }}
                        >
                            <option value="" disabled selected>Select District Code</option>
                            <option value="AM">Ampara</option>
                            <option value="AD">Anuradhapura</option>
                            <option value="BD">Badulla</option>
                            <option value="BT">Batticaloa</option>
                            <option value="CB">Colombo</option>
                            <option value="GL">Galle</option>
                            <option value="GP">Gampaha</option>
                            <option value="HB">Hambantota</option>
                            <option value="JA">Jaffna</option>
                            <option value="KT">Kalutara</option>
                            <option value="KD">Kandy</option>
                            <option value="KG">Kegalle</option>
                            <option value="KL">Kilinochchi</option>
                            <option value="KR">Kurunegala</option>
                            <option value="MN">Mannar</option>
                            <option value="MT">Matale</option>
                            <option value="MA">Matara</option>
                            <option value="MG">Monaragala</option>
                            <option value="ML">Mullaitivu</option>
                            <option value="NE">Nuwara Eliya</option>
                            <option value="PL">Polonnaruwa</option>
                            <option value="PT">Puttalam</option>
                            <option value="RT">Ratnapura</option>
                            <option value="TC">Trincomalee</option>
                            <option value="VA">Vavuniya</option>
                        </select>
                        </div>
        
                        <div className="input-group">
                        <label htmlFor="divisionalCode">Divisional Secretary's Division Code</label>
                        <input
                            type="text"
                            id="divisionalCode"
                            name="divisionalCode"
                            required
                            maxLength="5" 
                            title="Enter exactly 1 to 3 digits"
                            onKeyPress={(e) => {
                                const charCode = e.charCode;
                                if ((charCode < 48 || charCode > 57)) { 
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^[0-9]{1,5}$/.test(input) || input === "") {
                                    e.target.setCustomValidity('');
                                    setDivisionCode(input);
                                } else {
                                    e.target.setCustomValidity('Enter exactly 1 to 5 digits');
                                }
                            }}
                        />
                        </div>
        
        
                        <div className="input-group">
                        <label htmlFor="blockNumber">Block Number</label>
                        <input
                            type="text"
                            id="blockNumber"
                            name="blockNumber"
                            required
                            onKeyPress={(e) => {
                                const charCode = e.charCode;
                                const inputValue = e.target.value;
        
                                if (inputValue.length < 2 && charCode >= 48 && charCode <= 57) {
                                    
                                    return;
                                }
        
                                e.preventDefault(); 
                            }}
                            onChange={(e) => {
                                const input = e.target.value;
        
                                if (/^[0-9]{0,2}$/.test(input) || input === "") {
                                    e.target.setCustomValidity('');
                                    setBlockNumber(input);
                                } else {
                                    e.target.setCustomValidity('Enter exactly two integers for Block Number');
                                }
                            }}
                        />
                    </div>
        
        
        
                        
                        <div className="input-group">
                        <label htmlFor="fieldSize">Field Size</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            id="fieldSize"
                            name="fieldSize"
                            required
                            onKeyPress={(e) => {
                                const charCode = e.charCode;
                                const input = e.target.value;
                        
                                if (charCode === 46) {
                                  if (input.includes('.')) {
                                    e.preventDefault();
                                  }
                                } else if ((charCode < 48 || charCode > 57)) {
                                  e.preventDefault(); 
                                }
                              }}
                              onChange={(e) => {
                                let input = e.target.value;
                        
                                if (input.includes('.')) {
                                  const parts = input.split('.');
                                  if (parts[0].length > 6) {
                                    parts[0] = parts[0].slice(0, 6);
                                  }
                                  input = parts.join('.');
                                } else {
                                  if (input.length > 6) {
                                    input = input.slice(0, 6);
                                  }
                                }
                        
                                if (input.includes('.')) {
                                  const decimalPlaces = input.split('.')[1];
                                  if (decimalPlaces.length > 2) {
                                    input = `${input.split('.')[0]}.${decimalPlaces.slice(0, 2)}`;
                                  }
                                }
                        
                                e.target.value = input;
                                setSize(input);
                              }}
                        />
                        <span style={{ marginLeft: '5px' }}>acres</span>
                        </div>
                        </div>
        
        
        
                        <div class="input-group">
                            <label for="mpaCode">MPA Code</label>
                            <input type="text" id="mpaCode" name="mpaCode" required onChange = {(e)=> {
        
                                setMpaCode(e.target.value);
        
                            }} />
                        </div>
                    </div>
                    <div class="input-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        
        
        
            
    );
}