//laoding environment variables
require('dotenv').config();

//import modules
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const speakeasy = require('speakeasy');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
 
//enable cross origin resource sharing
app.use(cors());

//parse json object in request body
app.use(express.json()); 
 

 // Create a nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465 ,
  secure: true,
  auth: {
      // Retrieve email user and password from environment variables
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
 
});

// Handle POST request to send OTP
app.post('/send-otp', (req, res) => {
  const { mailid } = req.body;
 
  
  const oneTimeCode = speakeasy.totp({
    secret: speakeasy.generateSecret({ length: 20 }).base32,
    encoding: 'base32',
  });
  

    // Compose email with OTP
  const mailOptions = {
    from: 'hellh339@gmail.com',
    to: mailid,
    subject: 'One-Time Password (OTP)',
    text: `Your OTP is: ${oneTimeCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    
    res.json({ message: 'One-time code sent to your email' , otp: oneTimeCode });
  });
});

// Handle POST request to create new data in the database
app.post("/createData", async (req, res) => {
  try {
 
    const {
      Name,
      Price,
      Domain,
      ProgramType,
      Registrations,
      Description,
      PlacementAssurance,
      ImageUrl,
      UniversityName,
      FacultyProfileUrl,
      LearningHours,
       
      CertificateDiploma,
      EligibilityCriteria,
      Date,
    } = req.body;

   
  

    const newTodo = await pool.query(
      "INSERT INTO Programs(Name,  Price,  Domain,  ProgramType,  Registrations,  Description,  PlacementAssurance,  ImageUrl,  UniversityName,  FacultyProfileUrl,  LearningHours,   CertificateDiploma,  EligibilityCriteria, Date) VALUES(  $1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8 ,$9 ,$10 ,$11 ,$12 ,$13 ,$14) RETURNING *",
      [ Name,
        Price,
        Domain,
        ProgramType,
        Registrations,
        Description,
        PlacementAssurance,
        ImageUrl,
        UniversityName,
        FacultyProfileUrl,
        LearningHours,
        CertificateDiploma,
        EligibilityCriteria,
        Date]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



 
// Handle GET request to retrieve all data from the database
app.get("/getData", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM programs");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

 
// Handle GET request to retrieve  data from the database by ID
app.get("/getData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM programs WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

 
// Handle update request to update all data from the database using id
app.put("/updateData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Price,
      Domain,
      ProgramType,
      Registrations,
      Description,
      PlacementAssurance,
      ImageUrl,
      UniversityName,
      FacultyProfileUrl,
      LearningHours,
       
      CertificateDiploma,
      EligibilityCriteria,
      Date,
    } = req.body;
   
    const updateTodo = await pool.query(
      "UPDATE programs SET Name = $1, Price = $2, Domain = $3, ProgramType = $4, Registrations = $5, Description = $6, PlacementAssurance = $7,      ImageUrl = $8,      UniversityName = $9,      FacultyProfileUrl = $10,      LearningHours = $11, CertificateDiploma = $12, EligibilityCriteria = $13 , Date = $14 WHERE id = $15 returning *", 
      [ Name,
        Price,
        Domain,
        ProgramType,
        Registrations,
        Description,
        PlacementAssurance,
        ImageUrl,
        UniversityName,
        FacultyProfileUrl,
        LearningHours,
         
        CertificateDiploma,
        EligibilityCriteria,
        Date,
        id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

 
// Handle delete request to update all data from the database using id
app.delete("/deleteData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM programs WHERE id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});



 
// Handle register request to create account for usage
app.post("/register", async (req, res) => {
  try {
 
    const {
      name,
      mailid,
      password
    } = req.body;


    //creating hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const secret = speakeasy.generateSecret({ length: 20 });
   //inserting the data in the users2 table
    const credential = await pool.query(
      "INSERT INTO users2 (name,  mailid,  password , secret) VALUES(  $1 ,$2 ,$3,$4 ) RETURNING *",
      [ name , mailid , hashedPassword, secret]
    );

    res.json(credential.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//handling login requests
app.post("/login", async (req, res) => {
  try {
 
    const {
      mailid,
      password
    } = req.body;
  
  //query to handle the login request
    const queryResult  = await pool.query(
      "SELECT * FROM users WHERE mailid = $1 and password = $2",
      [   mailid , password]
    );

    res.json(queryResult.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//2fa login - two factor authentication login 

app.post("/login2", async (req, res) => {
  try {
 
    const {
      mailid,
      password
      
    } = req.body;
  
     
    const user  = await pool.query(
      "SELECT * FROM users2 WHERE mailid = $1 ",
      [mailid ]
    );
    if(!user){
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    

     
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
     
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  

  res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err.message);
  }
});



app.listen(5000, () => {
  
});