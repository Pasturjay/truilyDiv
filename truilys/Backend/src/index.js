const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
// const passport = require ('passport')
// const cookieSession = require ('cookie-session') 
// const passportSetup = require("./passport")
// const authRoute = require("./routes/auth");
// const GoogleStrategy = require('passport-google-oauth20').Strategy; // Adjust path as necessary

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// app.use(cookieSession({
//     name:'session',
//     keys:["cyberwolve"],
//     maxAge:20 * 60 * 60 * 100,
// }))

// app.use(passport.initialize());
// app.use(passport.session());


app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials:true,
        methods:" GET, POST, PUT, DELETE"
    }
))
mongoose.connect(process.env.MONGO_URI)
  
app.use('/user', userRoutes);
// app.use('/auth', authRoute)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
