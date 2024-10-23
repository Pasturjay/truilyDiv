// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     phoneNumber: { type: String, required: true, unique: true },
//     countryCode: { type: String, required: true },
//     otp: { type: String, default: null },
//     otpExpires: { type: Date, default: null },
//     email: { type: String, unique: true, sparse: true } // sparse allows for the email to be unique, but permits multiple docs with a null email.
// });

// module.exports = mongoose.model('User', UserSchema);






const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    countryCode: { type: String, required: true },
    phoneNumber: { type: String, required: true , unique:true},
    otp: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }  
});

module.exports = mongoose.model('User', userSchema);
