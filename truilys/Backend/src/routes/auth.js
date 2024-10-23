// // backend/routes/auth.js
// const router = express.Router();
// const passport = require('passport');
// const express = require('express');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;


// router.get('/login/success',(req,res)=>{
//  if (req.user) {
//     res.status(200).json({
//         error:false,
//         message:"successfully",
//         user:req.user,
//     })
//  }else{
//     res.status(403).json({error:true,message:"Not authorized"})
//  }
// });
// router.get('/login/failed',(req,res)=>{
//  res.status(401).json({
//     error:true,
//     message:"log in failure",
//  }) 
// });
// router.get('/google/callback',
//   passport.authenticate('google', { 
//     successRedirect:process.env.CLIENT_URL,
//     failureRedrect:"/login/failed",
//   })
// );
// router.get('/google',
//   passport.authenticate('google',['profile','email'])
// );
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });




// // // Passport configuration
// // passport.use(new GoogleStrategy({
// //     clientID: process.env.GOOGLE_CLIENT_ID,
// //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //     callbackURL: "/auth/google/callback"
// //   },
// //   function(accessToken, refreshToken, profile, done) {
// //     // Here, you'd find or create a user in your database
// //     return done(null, profile);
// //   }
// // ));

// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });

// // passport.deserializeUser((obj, done) => {
// //   done(null, obj);
// // });

// // // Routes

// // router.get('/google/callback',
// //   passport.authenticate('google', { failureRedirect: '/' }),
// //   function(req, res) {
// //     // Successful authentication, redirect to frontend
// //     res.redirect('http://localhost:3000');
// //   }
// // );

// // router.get('/logout', (req, res) => {
// //   req.logout();
// //   res.redirect('/');
// // });

// module.exports = router;
