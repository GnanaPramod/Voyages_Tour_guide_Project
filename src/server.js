import express from 'express';
//const express = require('express');
import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');
import cors from 'cors';
//const cors = require('cors');
import mongoose from 'mongoose';
//const mongoose = require('mongoose');
import multer from 'multer';
//const multer = require('multer');
import nodemailer from 'nodemailer';
//const nodemailer = require('nodemailer');
//import path from 'path';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

//import jwt from 'jsonwebtoken';
//import rateLimit from 'express-rate-limit';
//const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 5000;
// Rate limiting middleware
/**const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});**/

// Apply the rate limiter to all requests
//app.use(limiter);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/config', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  mobileno:String,
  profilePicture: String,
});
const MgrSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  profilePicture: { type: String },
  mgrid: { type: String, required: true }
});
const GuideSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  locname: { type: String, required: true },
  name: { type: String },
  mobileno:{type: String},
  profilePicture: { type: String },
  guideid: { type: String, required: true }
});
const tourSchema = new mongoose.Schema({
  locid: Number,
  locname: String,
  places: String,
  description: String,
  days: Number,
  budget: Number,
  images: [String] // Array of image filenames
});
const tourRequirementSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  username: { type: String, required: true },
  usrphno: { type: Number, required: true },
  email: { type: String, required: true },
  locname: { type: String, required: true },
  days: { type: Number, required: true },
  fromdate: { type: Date, required: true },
  todate: { type: Date, required: true },
  bdgt: { type: Number, required: true },
  plcs: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
// Create Schema for Tour Plan
const tourPlanSchema = new mongoose.Schema({
  userEmail: String,
  guideEmail: String,
  locname:String,
  planDetails: String,
  hotelAccommodation: String,
  travelVehicleDetails: String,
  fromdate: { type: Date, required: true },
  todate: { type: Date, required: true },
  hotelImages: [String],
  vehicleImages: [String],
  placesImages: [String],
  budget: Number
});
// Define schema for confirmed tour plan details
const confirmedDetailsSchema = new mongoose.Schema({
  userEmail: String,
  guideEmail: String,
  locname:String,
  fromDate: Date,
  toDate: Date
});

// Create model for confirmed tour plan details
const ConfirmedDetails = mongoose.model('ConfirmedDetails', confirmedDetailsSchema);
const TourPlan = mongoose.model('TourPlan', tourPlanSchema);
const TourRequirement = mongoose.model('TourRequirement', tourRequirementSchema);
const Tour = mongoose.model('Tour', tourSchema);
const User = mongoose.model('User', userSchema);


const Mgr = mongoose.model('Mgr', MgrSchema);
const Guide = mongoose.model('Guide', GuideSchema);
//const Mgr = mongoose.model('Mgr', mgrSchema);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});


const upload = multer({ storage: storage });
//GuideUpload
app.post('/guideupload', upload.fields([
  { name: 'hotelImages', maxCount: 10 },
  { name: 'vehicleImages', maxCount: 10 },
  { name: 'placesImages', maxCount: 10 }
]), async (req, res) => {
  try {
    const { userEmail, guideEmail, locname, planDetails, hotelAccommodation, travelVehicleDetails, fromdate, todate, budget } = req.body;
    const hotelImages = req.files['hotelImages'].map(file => file.filename);
    const vehicleImages = req.files['vehicleImages'].map(file => file.filename);
    const placesImages = req.files['placesImages'].map(file => file.filename);

    const tourPlan = new TourPlan({
      userEmail,
      guideEmail,
      locname,
      planDetails,
      hotelAccommodation,
      travelVehicleDetails,
      fromdate,
      todate,
      hotelImages,
      vehicleImages,
      placesImages,
      budget
    });

    await tourPlan.save();
    res.status(200).send("Tour plan uploaded successfully");
  } catch (error) {
    console.error('Error uploading tour plan:', error);
    res.status(500).send("Internal Server Error");
  }
});
// Endpoint to fetch tour plan details based on user email
app.get('/fetchTourPlan/:userEmail', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const tourPlan = await TourPlan.find({ userEmail });
    if (!tourPlan) {
      res.status(404).send('Tour plan not found for the given email');
    } else {
      res.status(200).json(tourPlan);
    }
  } catch (error) {
    console.error('Error fetching tour plan:', error);
    res.status(500).send("Internal Server Error");
  }
});
// Define route to fetch all tour plans associated with a specific user email
// API to fetch details based on userEmail
// API to fetch confirmation details based on user email
/**app.get('/confirmation/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;
    const confirmations = await ConfirmedDetails.find({ userEmail });
    res.json(confirmations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});**/
app.get('/confirmation/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;
    const confirmations = await ConfirmedDetails.find({ userEmail });

    // Extract guide emails from all confirmations
    const guideEmails = confirmations.map(confirmation => confirmation.guideEmail);

    // Fetch guide details for each guide email
    const guideDetails = await Guide.find({ email: { $in: guideEmails } });

    // Combine confirmation and guide details
    const combinedDetails = {
      confirmations: confirmations,
      guideDetails: guideDetails
    };

    res.json(combinedDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/confirmationguide/:guideEmail', async (req, res) => {
  try {
    const { guideEmail } = req.params;
    const confirmations = await ConfirmedDetails.find({ guideEmail });

    // Extract guide emails from all confirmations
    const userEmails = confirmations.map(confirmation => confirmation.userEmail);

    // Fetch guide details for each guide email
    const userDetails = await User.find({ email: { $in: userEmails } });

    // Combine confirmation and guide details
    const combinedDetails = {
      confirmations: confirmations,
      userDetails: userDetails
    };

    res.json(combinedDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'projectplazapro@gmail.com', // Your Gmail email address
      pass: 'bynw qsyz fbqy guvq' // Your Gmail password
    }
  });
app.post('/signup', upload.single('profilePicture'), async (req, res) => {
  try {
    const { username, email, password, name, mobileno } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      name,
      mobileno,
      profilePicture: req.file ? req.file.filename : '' // Save only the filename in the database
    });

    await newUser.save();

    // Send confirmation email
    const mailOptions = {
      from: 'projectplazapro@gmail.com',
      to: email,
      subject: 'Welcome to MyApp!',
      text: `Dear ${name},\n\nThank you for signing up with MyApp.`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  const transporter1 = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'projectplazapro@gmail.com', // Your Gmail email address
        pass: 'bynw qsyz fbqy guvq' // Your Gmail password
      }
    });
  app.post('/mgrsignup', upload.single('profilePicture'), async (req, res) => {
    try {
      const { username, email, password, name, mgrid } = req.body;
      if (mgrid !== '2445') {
        return res.status(400).json({ message: 'Invalid manager ID' });
      }

      // Basic validation
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Check if user already exists
      const existingUser = await Mgr.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Create new user
      const newUser = new Mgr({
        username,
        email,
        password,
        name,
        mgrid,
        profilePicture: req.file ? req.file.path : ''
      });
  
      await newUser.save();
  
      // Send confirmation email
      const mailOptions = {
        from: 'projectplazapro@gmail.com',
        to: email,
        subject: 'Welcome to MyApp!',
        text: `Dear ${name},\n\nThank you for signing up with MyApp.`
      };
  
      transporter1.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  const transporter2 = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'projectplazapro@gmail.com', // Your Gmail email address
        pass: 'bynw qsyz fbqy guvq' // Your Gmail password
      }
    });
  app.post('/guidesignup', upload.single('profilePicture'), async (req, res) => {
    try {
      const { username, email, password, locname, name, mobileno, guideid } = req.body;
      if (guideid !== '1445') {
        return res.status(400).json({ message: 'Invalid guide ID' });
      }

      // Basic validation
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Check if user already exists
      const existingUser = await Guide.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Create new user
      const newUser = new Guide({
        username,
        email,
        password,
        locname,
        name,
        mobileno,
        guideid,
        profilePicture: req.file ? req.file.path : ''
      });
  
      await newUser.save();
  
      // Send confirmation email
      const mailOptions = {
        from: 'projectplazapro@gmail.com',
        to: email,
        subject: 'Welcome to MyApp!',
        text: `Dear ${name},\n\nThank you for signing up with MyApp as Guide.`
      };
  
      transporter2.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  const transporter6 = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'projectplazapro@gmail.com', // Your Gmail email address
        pass: 'bynw qsyz fbqy guvq' // Your Gmail password
      }
    });
  const transporter7 = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'projectplazapro@gmail.com', // Your Gmail email address
        pass: 'bynw qsyz fbqy guvq' // Your Gmail password
      }
    });
 // Define route to confirm tour plan details
app.post('/confirmTourPlan', async (req, res) => {
  try {
    // Extract details from request body
    const { userEmail, guideEmail, locname, fromDate, toDate } = req.body;
    const guidename = Guide.findOne({email: guideEmail});
    const custname = User.findOne({email: userEmail});
    // Create new confirmed tour plan document
    const confirmedDetails = new ConfirmedDetails({
      userEmail,
      guideEmail,
      locname,
      fromDate,
      toDate
    });

    // Save confirmed tour plan to database
    await confirmedDetails.save();
    // Send confirmation email
    const mailOptions = {
      from: 'projectplazapro@gmail.com',
      to: userEmail,
      subject: 'Welcome to MyApp!',

      text: `Dear ${custname.username},\n\nThank you for confirming the plan and details well be sent through webssite please go throught it!.`

    };
    const mailOptions1 = {
      from: 'projectplazapro@gmail.com',
      to: userEmail,
      subject: 'Welcome to MyApp!',

      text: `Dear ${guidename.username},\n\n One User has confirmed your plan, please visit Voyages Website for further details.`

    };
    transporter6.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    transporter7.sendMail(mailOptions1, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    // Delete remaining tour plan details based on user email
    // Note: Change 'TourPlan' to the appropriate model name if it's different
    //await TourPlan.deleteMany({ userEmail });
    // Delete remaining tour plan details except the one that is confirmed
    await TourPlan.deleteMany({ userEmail, guideEmail: { $ne: guideEmail } });
    res.status(200).send('Tour plan confirmed and saved successfully');
  } catch (error) {
    console.error('Error confirming tour plan:', error);
    res.status(500).send('Internal Server Error');
  }
});
  app.post('/manager', upload.array('images'), async (req, res) => {
    try {
      const { locid, locname, places, description, days, budget } = req.body;
      const images = req.files.map(file => file.originalname);
  
      // Save tour data to MongoDB
      const tour = new Tour({
        locid,
        locname,
        places,
        description,
        days,
        budget,
        images
      });
      await tour.save();
  
      // Return a success response
      res.status(200).json({ message: 'Tour created successfully', tour });
    } catch (error) {
      console.error('Error creating tour:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  app.use("/uploads",express.static(path.join(__dirname,"/uploads")));
  //signin-authentication
  // Get all tours
app.get('/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  app.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Basic validation
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
  
      // Check if user exists
      const user = await User.findOne({ email, password });
      if (user) {
        // Successful sign-in

        //const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });


        return res.status(200).json({ success: true, message: 'Sign in successful' });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  //user-profile
  app.get('/user/profile/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email });
  
      if (user) {
        //const profilePictureFilename = user.profilePicture.split('\\').pop();
        //user.profilePicture = profilePictureFilename; // Update the profile picture path to only the filename
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/mgr/profile/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const user = await Mgr.findOne({ email });
  
      if (user) {
        
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/guide/profile/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const user = await Guide.findOne({ email });
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.post('/mgrsignin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Basic validation
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
  
      // Check if user exists
      const user = await Mgr.findOne({ email, password });
      if (user) {
        // Successful sign-in
        return res.status(200).json({ success: true, message: 'Sign in successful' });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  app.post('/guidesignin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Basic validation
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
  
      // Check if user exists
      const user = await Guide.findOne({ email, password });
      if (user) {
        // Successful sign-in
        return res.status(200).json({ success: true, message: 'Sign in successful' });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  app.get('/tours/:locationName', async (req, res) => {
    try {
        const locationName = req.params.locationName;
        const tour = await Tour.findOne({ locname: locationName });
        res.json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post('/tourpage', async (req, res) => {
  try {
    const {
      userid,
      username,
      usrphno,
      email,
      locname,
      days,
      fromdate,
      todate,
      bdgt,
      plcs
    } = req.body;

    const tourRequirement = new TourRequirement({
      userid,
      username,
      usrphno,
      email,
      locname,
      days,
      fromdate,
      todate,
      bdgt,
      plcs
    });

    await tourRequirement.save();
    const guides = await Guide.find({ locname: locname });
    const transporter3 = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'projectplazapro@gmail.com', // Your Gmail email address
          pass: 'bynw qsyz fbqy guvq' // Your Gmail password
        }
      });
    // Iterate through each guide and send an email
    for (const guide of guides) {
      const mailOptions = {
        from: 'projectplazapro@gmail.com', // Sender address
        to: guide.email, // Receiver address
        subject: 'New Tour Request', // Subject line
        text: `Hello ${guide.username},\n\nYou have a new tour request. Please check your dashboard for more details.\n\nRegards,\nVoyages Tour and Travels Pvt.Limited` // Plain text body
      };

      // Send email
      await transporter3.sendMail(mailOptions);
    }
    res.status(201).send(tourRequirement);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Your other middleware and configurations
app.get('/tourRequirements', async (req, res) => {
  try {
    const { locname } = req.query;
    let query = {};

    // If locname is provided, filter by locname
    if (locname) {
      query = { locname: { $regex: new RegExp(locname, 'i') } };
    }

    // Fetch tour requirements from the database, sorted by timestamp in descending order
    const tourRequirements = await TourRequirement.find(query).sort({ timestamp: -1 }).exec();
    res.status(200).json(tourRequirements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});/** 
app.get('/api/tourRequirements', async (req, res) => {
  try {
    const tourRequirements = await TourRequirement.find().exec();
    res.status(200).json(tourRequirements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});**/
  // Password reset route
app.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/reset-passwordmgr', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if user exists
    const user = await Mgr.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.post('/reset-passwordguide', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if user exists
    const user = await Guide.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
