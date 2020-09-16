const express = require("express");
const router = express.Router();
const passport = require('passport');

// ROUTE /
router.get("/", (req, res) => {
    if (req.user) {
        return res.redirect('/home');
    }
    res.render('login-view');
})


router.post("/", passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    (req, res) => {
        res.redirect('/home');
    });
// --------------------------------------------------------------


// ROUTE /logout
router.get("/logout", (req, res) => {
    req.logout();
    // hapus property pada req.user yg di buat oleh passport js
    // setiap kali user berhasil login
    req.flash('message', ['primary', 'kamu telah logout!']);
    res.redirect('/');
})
// -------------------------------------------
module.exports = router;