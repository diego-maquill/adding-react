/* importing required files and packages */
const express = require('express');
const router = express.Router();
const xss = require('xss');
const validator = require('validator');
const data = require('../../../models');
const usersData = data.shoppers;
const credentialsData = data.credentials;
const passport = require('../../../config/passport-users');
const emailToLowerCase = require('../comp/email-case-converter').emailToLowerCase;

/* local scoped function */
//------ shopper authentication validation
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/shopper/dashboard');
    } else {
        return next();
    }
}

//------ shopper email validation
function isValid(req, res, next) {
    let email = emailToLowerCase(xss(req.body.email));
    let password = xss(req.body.password);

    if (email.length == 0) {
        res.status(404).send({
            error: "No email id provided"
        });
    } else if (password.length == 0) {
        res.status(404).send({
            error: "No password provided"
        });
    }

    // validating email syntax
    if (!validator.isEmail(email)) {
        res.status(404).send({
            error: "Invalid email id format."
        });
        return;
    }

    credentialsData.getCredentialById(email).then((userCredentials) => {
        if (userCredentials == null) { // no shopper document found
            res.status(404).send({
                error: "This email id is not registered"
            });
        } else { // document found and comparing credentials
            credentialsData.compareCredential(email, password)
                .then(() => {
                    next(); // sent for shopper authentication
                })
                .catch((error) => { // credentials mismatched error
                    res.status(400).send({
                        error: "Incorrect password"
                    });
                });
        }
    });
}

/* global scoped function */
//------------------------ route to fetch shopper information by email id
router.get('/', isLoggedIn, (req, res) => {
    req.flash('loginFlash');

    if (req.session.flash["error"] === undefined) {
        res.render('shoppers/auth/shopper-login-account', {
            mainTitle: "Dashboard Login •",
            url: '/shopper/dashboard',
            error: req.session.flash.error
        });
    } else {
        res.render('shoppers/auth/shopper-login-account', {
            mainTitle: "Dashboard Login •",
            error: req.session.flash.error.slice(-1)[0]
        });
    }
});

//------------------------ routing for login form submit
router.post('/', isValid, (req, res) => {
    let shopper = { // create 'shopper' object
        email: emailToLowerCase(xss(req.body.email)),
        password: xss(req.body.password)
    }

    passport.authenticate('shopper')(req, res, function () { //authenticate shopper
        res.json({
            success: true,
            url: req.url
        });
    });
});

/*
router.post('/',
    passport.authenticate('shopper', { 
        successRedirect: '/shopper/dashboard', 
        failureRedirect: '/shopper/login', 
        failureFlash: true 
    })
);
*/

// exporting routing apis
module.exports = router;