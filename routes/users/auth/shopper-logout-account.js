/*
const express = require('express');
const router = express.Router();
const passport = require('../../../config/passport-shoppers');
const passportLogout = require('express-passport-logout');

/* local scoped function */
//------ check shopper authenticity
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        return next();
    }
}

/* global scoped function */
//------------------------ route to fetch shopper information by id
router.get('/', isLoggedIn, (req, res) => {
    res.redirect('/shopper/login');
});

//------------------------ routing for login form submit
router.post('/', (req, res) => {
    req.logOut();
    res.redirect('/shopper/login');
});

// exporting routing apis
module.exports = router;