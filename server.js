const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const DATABASE_URL = process.env.DATABASE_URL;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.POSTGRES_URL + '?sslmode=require',
        //  DATABASE_URL: DATABASE_URL,
        //  host: 'PGPASSWORD=WnjwPgmEKSxOQmLZrmIHqOAmkZRMOdaQ psql -h dpg-cl4n26c72pts739jbp70-a.ohio-postgres.render.com -U smart_brain_api_038g_user smart_brain_api_038g',
        //  port: 5432,
        //  user: 'smart_brain_api_038g_user',
        //  password: 'WnjwPgmEKSxOQmLZrmIHqOAmkZRMOdaQ',
        //  database: 'smart-brain-api',
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



app.listen(process.env.PORT, () => {
    console.log('App is running on port 3000')
})




/*
/ --> res - this is working
/ signin --> POST (user info) success or fail
/ register --> POST =  user obj we return
/ profile/:userId --> GET (user info) = user
/ image (endpoint) --> PUT (make sure user exists and update) --> user


*/