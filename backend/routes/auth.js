const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = "dhruv$gajjar"
let success = false;

//create a user using:POST 
router.post('/createuser', [
    body('Name', 'Enter a valid name').isLength({ min: 5 }),
    body('Email').isEmail(),
    body('Password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //If there are errors, show bad errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {


        //check whether the user with this email exists 
        let user = await User.findOne({ Email: req.body.Email });
        if (user) {
            return res.status(400).json({ success, error: "sorry a user with this Emailid exits" })
        }
        const salt = await bcrypt.genSalt(10);
        const setP = await bcrypt.hash(req.body.Password, salt)
        user = await User.create({
            Name: req.body.Name,
            Password: setP,
            Email: req.body.Email,
        })
        const data = {
            user: {
                id: user.id
            }
        }


        const AuthT = jwt.sign(data, JWT_SECRET);
        // console.log(AuthT)
        success = true;
        res.json({ success, AuthT })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occured");

    }
})

//Login by user :POST 
router.post('/login', [
    body('Email', 'Enter a  valid Email').isEmail(),
    body('Password', 'Enter a valid Password').exists()
], async (req, res) => {

    //If there are errors, show bad errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { Email, Password } = req.body;
    try {
        let user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({ success, error: "Please login with correct data" })
        }

        const passwordcmp = await bcrypt.compare(Password, user.Password);
        if (!passwordcmp) {
            return res.status(400).json({ success, error: "Please login with correct data" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthT = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, AuthT })



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occured")
    }

})

//get user details using:POST ---Login Required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-Password")
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occured")
    }
}

)

module.exports = router;

