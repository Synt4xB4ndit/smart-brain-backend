const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// const PORT = process.env.PORT
// const DATABASE_URL = process.env.DATABASE_URL
// We have to delcare Environment Variables for the Info
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_DB,
        // normally need an ENVIRONMENT VARIABLE
        // ssl: true
    }
});


// CHECKS FOR USERS AND THERE ARE NONE 
//db.select('*').from('users').then(data => {
//  console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(db.users);
})

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
// bc we want an object

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })
//bcrypt.hash("bacon", null, null, function (err, hash) {
// Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
// res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
// res = false
// });

// const DATABASE_URL = process.env.DATABASE_URL



app.listen(3000, () => {
    console.log('App is running on port 3000')
})





/*
/ --> res - this is working
/ signin --> POST (user info) success or fail
/ register --> POST =  user obj we return
/ profile/:userId --> GET (user info) = user
/ image (endpoint) --> PUT (make sure user exists and update) --> user


*/