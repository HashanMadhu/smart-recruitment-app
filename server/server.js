// server/server.js
// [Language: JavaScript / Node.js]

// ==========================================
// 🔴 OLD LINES (පරණ රේඛා)
// ==========================================
// 1. Configure dotenv to read variables from the .env file (Must be at the very top)
// 1. .env file එකේ තියෙන දත්ත කියවන්න dotenv package එක සකස් කිරීම
require('dotenv').config();

// Fix for Node.js DNS issues with MongoDB SRV URIs on some Windows networks
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// 2. Import Express and Mongoose packages into this file
// 2. Express සහ Mongoose (Database මෙවලම) මේ File එකට සම්බන්ධ කරගන්නවා
const express = require('express');
const mongoose = require('mongoose');

// 3. Initialize the Express application instance
// 3. Express ඇප් එකක් (Instance එකක්) සාදා ගන්නවා
const app = express();


// ==========================================
// 🟢 NEW ADDING LINES (අලුතින් එකතු කළ රේඛා)
// ==========================================
// Middleware to parse incoming JSON requests (Essential for API Post Requests)
// API එකට එන JSON දත්ත කියවිය හැකි වන ලෙස සකස් කර ගන්නා Middleware එක (Postman එකෙන් දත්ත එවන්න මේක අනිවාර්යයි)
app.use(express.json());

// Import the Auth Route file we created
// අපි කලින් සාදාගත් Auth Route ලේඛනය සම්බන්ධ කර ගැනීම
const auth = require('./routes/auth');

// Mount the Auth Router to a specific path (/api/auth)
// අපේ Auth දොරටුව නිල වශයෙන් පද්ධතියේ '/api/auth' ලින්ක් එකට සම්බන්ධ කිරීම
app.use('/api/auth', auth);


// ==========================================
// 🔴 OLD LINES (පරණ රේඛා)
// ==========================================
// 4. Retrieve environment variables
// 4. .env ලේඛනයෙන් අවශ්‍ය සැකසුම් ලබා ගැනීම
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 5. Connect to MongoDB Database using Mongoose
// 5. Mongoose හරහා MongoDB දත්තගබඩාව සමඟ සම්බන්ධ වීම
mongoose.connect(MONGO_URI)
    .then(() => {
        // Prints an English log message when database connection is successful
        // දත්තගබඩාව සාර්ථකව සම්බන්ධ වූ විට Terminal එකේ ඉංග්‍රීසියෙන් පණිවිඩය පෙන්වයි
        console.log('MongoDB database connected successfully!');
    })
    .catch((error) => {
        // Prints an English log message if the connection fails
        // සම්බන්ධතාවය අසාර්ථක වුවහොත් ලැබෙන දෝෂය පෙන්වයි
        console.log(`Database connection error: ${error.message}`);
    });

// 6. Create a basic root endpoint to test the server functionality via browser
// 6. සරලම Endpoint එකක් (ලින්ක් එකක්) හදනවා වෙබ් බ්‍රවුසර් එකෙන් පරීක්ෂා කරලා බලන්න
app.get('/', (req, res) => {
    res.send('Recruitment Server is running successfully!');
});

// 7. Start the server and listen for incoming requests on the specified port
// 7. සේවාදායකය පණ ගන්වා (Listen) එය බලාපොරොත්තුවෙන් සිටීමට සැලැස්වීම
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}!`);
});