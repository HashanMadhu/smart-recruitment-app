// server/routes/auth.js
// [Language: JavaScript / Node.js]

const express = require('express');
const router = express.Router();

// Import the controller function we created earlier
// අපි කලින් සාදාගත් Controller එකේ ඇති Function එක සම්බන්ධ කර ගැනීම
const { register } = require('../controllers/auth');

// Map the POST request coming to '/register' to the register controller function
// '/register' කියන දොරටුවට එන POST Request එක අදාළ Controller Function එකට යොමු කිරීම
router.post('/register', register);

// Export the router to be used in the main server.js file
// ප්‍රධාන server.js ලේඛනය තුළ පාවිච්චි කිරීම සඳහා Router එක Export කිරීම
module.exports = router;