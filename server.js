const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const passport = require('passport');

const patients = require("./routes/api/patients");


const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useUnifiedTopology: true , useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Use Routes
patients.setup(app);
//app.use('/api/patients', patients);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
