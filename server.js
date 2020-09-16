// require .env
require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportConfig = require("./config/passport-config");
const conn = require('./config/connection');
const flash = require('connect-flash');
const app = express();

const port = process.env.PORT || 3000;

// import routes
const indexRoute = require("./routes/index-route");
const registerRoute = require("./routes/register-route");
const homeRoute = require("./routes/home-route");


app.use(morgan('tiny'));
app.use(cookieSession({
    name: 'session',
    keys: ['afaf1', 'safasfg']
}))

app.use(flash());

// use passportjs
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.message = req.flash("message");
    next();
    // jika req.flash('messsage') tidak di buat nilai defaultnya adalah [] (array kosong);
})
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


// use route
app.use('/', indexRoute);
app.use('/register', registerRoute);
app.use('/home', homeRoute);

app.listen(port, () => console.log('running at localhost:' + port));