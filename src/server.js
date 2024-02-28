import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/req', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Schema
const userSchema = new mongoose.Schema({
  userid:String,
  username: String,
  usrphno:String,
  email: String,
  locname:String,
  days:String,
  fromdate:String,
  todate:String,
  bdgt:String,
  plcs:String
});
const SignUpSchema = new mongoose.Schema({
  userid: { type: String, unique: true },
  username:String,
  userpwd:String,
  email:String,
  usrphno:String

});
// Define image schema
const imageSchema = new mongoose.Schema({
  locid:String,
  locname:String,
  places:String,
  description:String,
  days:String,
  budget:String,
  imagePath: String
});

const Image = mongoose.model('Image', imageSchema);


const User = mongoose.model('User', userSchema);
const Signupuser = mongoose.model('Signupuser',SignUpSchema);
//const Image = mongoose.model('Image', imageSchema);
// Middleware for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.post('/tourpage', async (req, res) => {
  try {
    const { userid,username, usrphno, email, locname, days, fromdate, todate, bdgt, plcs } = req.body;
    const newUser = new User({ userid,username, usrphno, email, locname, days, fromdate, todate, bdgt, plcs });
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});
app.post('/signup', async(req, res) => {
  try {
    const { username, userpwd, email, usrphno } = req.body;
    const userid = Math.floor(100000 + Math.random() * 900000).toString(); 

    const signupUser = new Signupuser({ userid, username, userpwd, email, usrphno });
    await signupUser.save();
    //const signupUser = new Signupuser({ username, userpwd, email, usrphno  });
    //await signupUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});
// Route for uploading images
app.post('/manager', upload.array('images', 4), async (req, res) => {
  try {
   
    const {locid, locname, places, description, days, budget } = req.body;
    const imagePaths = req.files.map(file => file.path);
   
      // Create an array of image data objects with imagePath, places, and budget
    const imagesData = imagePaths.map(imagePath => ({
      imagePath,
      locid,
      locname,
      places,
      description,
      days,
      budget
    }));
  
    // Create images in the database using the Image model
    const images = await Promise.all(imagesData.map(imageData => Image.create(imageData)));
    
    // Send a response with the uploaded images
    res.status(200).json({ message: 'Images uploaded successfully', images });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'An error occurred while uploading images' });
  }
});




//app.use('/manager', express.static('uploads'));
// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
