const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const User = require('../models/user'); // Adjust path as necessary
const dotenv = require('dotenv');

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore = {}; // In-memory store for OTPs

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate a simple request ID using timestamp and phone number
// const generateRequestId = (phoneNumber) => `${phoneNumber}-${Date.now()}`;

router.post('/send-otp', async (req, res) => {
    const { phoneNumber, countryCode } = req.body;
    const sanitizedPhoneNumber = phoneNumber.trim();
  
    if (!phoneNumber || !countryCode) {
      return res.status(400).json({ error: 'Phone number and country code are required' });
    }
    const fullPhoneNumber = `${countryCode}${sanitizedPhoneNumber}`;
  
    const otp = generateOtp();
    otpStore[fullPhoneNumber] = { otp, createdAt: Date.now() }; // Store OTP with sanitized phone number
    console.log('OTP stored:', otpStore[fullPhoneNumber]);
    console.log(otp);
  
    try {
      await twilioClient.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: fullPhoneNumber,
      });
  
      // Debugging: Log the current OTP store
      console.log('Current OTP Store:', otpStore);
  
      setTimeout(() => {
        delete otpStore[fullPhoneNumber];
        console.log(`OTP for ${fullPhoneNumber} deleted after timeout`);
      }, 300000); // Remove after 5 minutes
  
      res.status(200).json({ message: 'OTP sent successfully', otp });
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      res.status(500).json({ error: 'Error sending OTP', details: error.message });
    }
  });
  
  router.post('/verify-otp', (req, res) => {
    const { phoneNumber, countryCode, otp } = req.body;
  
    if (!otp) {
      console.error('OTP is required');
      return res.status(400).json({ error: 'OTP is required', details: 'Please provide a valid OTP' });
    }
  
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    const storedOtp = otpStore[fullPhoneNumber]?.otp;
  
    if (storedOtp && storedOtp === otp) {
      delete otpStore[fullPhoneNumber]; // Optionally remove the OTP after successful verification
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid OTP', details: 'The provided OTP is invalid' });
    }
  });







// // Route to save email
// router.post('/save-email', async (req, res) => {
//     const { phoneNumber, email } = req.body;

//     if (!phoneNumber || !email) {
//         return res.status(400).json({ error: 'Phone number and email are required' });
//     }

//     try {
//         const user = await User.findOne({ phoneNumber });

//         if (!user) {
//             return res.status(400).json({ error: 'Phone number not verified' });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         user.email = email; // Update email
//         await user.save();

//         res.status(200).json({ message: 'Email saved successfully' });
//     } catch (error) {
//         console.error('Error saving email:', error);
//         res.status(500).json({ error: 'Error saving email' });
//     }
// });

// module.exports = router;



// router.post('/save-email', async (req, res) => {
//     const { email, phoneNumber, countryCode, otp } = req.body;
//     console.log('Received Phone Number:', phoneNumber); // Log here
//     if (!email || !phoneNumber || !countryCode || !otp) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Verify OTP and phone number
//     const storedOtpData = otpStore[phoneNumber];

//     if (!storedOtpData) {
//         return res.status(400).json({ error: 'OTP not found for this phone number' });
//     }

//     const { otp: storedOtp, expires } = storedOtpData;

//     // Check if OTP is expired
//     if (Date.now() > expires) {
//         return res.status(400).json({ error: 'OTP has expired' });
//     }

//     // Check if the OTP matches
//     if (storedOtp !== otp) {
//         return res.status(400).json({ error: 'Phone number not verified' });
//     }

//     // Proceed with saving the email
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         const newUser = new User({ email, phoneNumber, countryCode });
//         await newUser.save();

//         res.status(200).json({ message: 'Email saved successfully' });
//     } catch (error) {
//         console.error('Error saving email:', error.message);
//         res.status(500).json({ error: 'Error saving email', details: error.message });
//     }
// });

// module.exports = router;


router.post('/save-email', async (req, res) => {
    const { email, phoneNumber, countryCode, otp } = req.body;
    const sanitizedPhoneNumber = phoneNumber.trim();
    const fullPhoneNumber = `${countryCode}${sanitizedPhoneNumber}`;

    console.log('Received Data:', { email, fullPhoneNumber, otp });
    console.log('OTP Store Contents:', otpStore); // Log the entire otpStore for debugging

    if (!email || !sanitizedPhoneNumber || !countryCode || !otp) {
        return res.status(400).json({ error: 'Missing email, phone number, country code, or OTP' });
    }

    // Check if OTP exists for the full phone number
    const storedOtpData = otpStore[fullPhoneNumber];
    if (!storedOtpData || storedOtpData.otp !== otp) {
        console.error('No OTP found for:', fullPhoneNumber);
        return res.status(400).json({ error: 'OTP not found for this phone number' });
    }

    // Proceed with saving email or other logic
    delete otpStore[fullPhoneNumber];
    res.status(200).json({ message: 'Email saved successfully' });
});


 module.exports = router;
