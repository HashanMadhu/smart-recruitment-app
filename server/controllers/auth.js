// server/controllers/auth.js
// [Language: JavaScript / Node.js]

// Import the User Model to interact with the MongoDB database
// දත්තගබඩාව සමඟ ගනුදෙනු කිරීම සඳහා User Model එක සම්බන්ධ කර ගැනීම
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 

// @desc    Register a new user (පරිශීලකයෙකු අලුතින් ලියාපදිංචි කිරීම)
// @route   POST /api/auth/register
// @access  Public (ඕනෑම කෙනෙකුට විවෘතයි)
exports.register = async (req, res, next) => {
    try {
        // Extract registration data from the request body
        // Request body එක හරහා එන දත්ත ටික වෙන් කර ලබා ගැනීම
        const { name, email, password, role } = req.body;

        // Create a new user record in the database using the User Model
        // User Model එක හරහා දත්තගබඩාව තුළ අලුත් පරිශීලකයෙකු නිර්මාණය කිරීම
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        // Create token (අලුතින් ටෝකන් එකක් සෑදීම)
        const token = user.getSignedJwtToken();

        // Send a successful JSON response with 201 Created status
        // සාර්ථකව දත්ත තැන්පත් වූ බව පවසමින් 201 Status එක සමඟ JSON ප්‍රතිචාරයක් යැවීම
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token, 
            data: user
        });

    } catch (error) {
        // Catch any errors (e.g., duplicate email) and return a 400 Bad Request status
        // කිසියම් දෝෂයක් සිදු වුවහොත් (උදා: Email එක දැනටමත් තිබීම), එය හසුකරගෙන 400 Status එකක් යැවීම
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body; 

        //Check if email and password are provided
        if(!email || !password){
            return res.status(400).json({success: false, error: 'Please provide an email and Password'});
        }

        //Find the user in the database by email
        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({success: false, message: 'Invalid credetials(User Not Found)'});
        }

        //Check if the provided password matches the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({success: false, message: 'Invalid credetials(Password does not match)'});
        }

        // Create token (ලොගින් වූ නිසා ටෝකන් එකක් සෑදීම)
        const token = user.getSignedJwtToken();

        //Send a successful JSON response with 200 OK status
        res.status(200).json({
            success: true,
            message: 'User Login Successfully',
            token, 
            data: {id: user._id, name: user.name, email: user.email}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};