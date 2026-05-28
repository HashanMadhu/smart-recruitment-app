// server/routes/auth.js
// [Language: JavaScript / Node.js]

const express = require('express');
const router = express.Router();



// Import the controller functions we created earlier(Register and Login Functions)
const { register, login } = require('../controllers/auth');

// Map the POST request coming to '/register' to the register controller function
// '/register' කියන දොරටුවට එන POST Request එක අදාළ Controller Function එකට යොමු කිරීම
router.post('/register', register);

// Map the POST request coming to '/login' to the login controller function
// '/login' කියන දොරටුවට එන POST Request එක අදාළ Controller Function එකට යොමු කිරීම
router.post('/login', login);

// Export the router to be used in the main server.js file
// ප්‍රධාන server.js ලේඛනය තුළ පාවිච්චි කිරීම සඳහා Router එක Export කිරීම
module.exports = router;