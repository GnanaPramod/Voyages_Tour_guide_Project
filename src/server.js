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
  name: { type: String },
  profilePicture: { type: String },
  guideid: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);


const Mgr = mongoose.model('Mgr', MgrSchema);
const Guide = mongoose.model('Guide', GuideSchema);
//const Mgr = mongoose.model('Mgr', mgrSchema);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Nodemailer configuration

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'projectplazapro@gmail.com', // Your Gmail email address
      pass: 'bynw qsyz fbqy guvq' // Your Gmail password
    }
  });

app.post('/signup', upload.single('profilePicture'), async (req, res) => {
    try {
      const { username, email, password, name } = req.body;
  
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
      const { username, email, password, name, guideid } = req.body;
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
        name,
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
  //signin-authentication
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