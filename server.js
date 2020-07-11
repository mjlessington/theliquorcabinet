//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `theliquorcabinet`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________

// //Test
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//Connect to controller

const Cabinet = require('./models/cabinets.js')

const cabinetsController = require('./controllers/cabinets.js')
app.use('/cabinets', cabinetsController)



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));