/* importing required files and packages */
const express = require('express');
const router = express.Router();
const xss = require('xss');
const validator = require('validator');
const data = require('../../../models');
const shopperData = data.shoppers;
const credentialsData = data.credentials;
const passport = require('../../../config/passport-users');
const emailToLowerCase = require('../comp/email-case-converter').emailToLowerCase;

/* local scoped function */
//------ user authentication validation
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/shopper/dashboard');
    } else {
        return next();
    }
}

/* global scoped function */
//------------------------ route to render to create new shopper form
router.get('/', isLoggedIn, (req, res) => {
    res.render('shoppers/auth/create-new-shopper', {
        mainTitle: "Create an Account •"
    });
});

//------------------------ route to create new shopper into database
router.post('/', (req, res) => {
    let newShopper = req.body;

    let name = xss(newShopper.name);
    let email = emailToLowerCase(xss(newShopper.email));
    let mobile = xss(newShopper.mobile);
    let password = xss(newShopper.password);

    // checking null values
    if (!name) {
        res.render('shoppers/auth/create-new-shopper', {
            mainTitle: "Create an Account •",
            error: "Please provide your name."
        });
        return;
    } else if (!email) {
        res.render('shoppers/auth/create-new-shopper', {
            mainTitle: "Create an Account •",
            error: "Please provide your email id."
        });
        return;
    } else if (!mobile) {
        res.render('shoppers/auth/create-new-shopper', {
            mainTitle: "Create an Account •",
            error: "Please provide your contact number."
        });
        return;
    } else if (!password) {
        res.render('shoppers/auth/create-new-shopper', {
            mainTitle: "Create an Account •",
            error: "Please provide your account password."
        });
        return;
    }

    // validating email syntax
    if (!validator.isEmail(email)) {
        res.status(404).send({
            error: "Invalid email id format."
        });
        return;
    }

    // searching for an existing user
    shopperData.getShopperById(email).then((userJsonDocument) => {

            if (userJsonDocument == null) { // validating received document whether user exist or not
                shopperData.createNewShopper(name, email, mobile).then((createUserDocument) => {
                    credentialsData.createNewCredential(email, password).then((userCredential) => {

                        let shopper = { // create 'shopper' object
                            email: email,
                            password: password
                        }

                        passport.authenticate('shopper')(req, res, function () { //authenticate shopper
                            res.json({
                                success: true
                            });
                        });

                    });
                });
            } else { // rendering error page if shopper already exists
                res.status(400).send({
                    error: "This email id is already registered."
                });
            }
        })
        .catch((error) => { // rendering error page
            res.render('alerts/error', {
                mainTitle: "Server Error •",
                code: 500,
                message: error,
                url: req.originalUrl,
                shopper: req.shopper
            });
        });
});

// exporting routing apis
module.exports = router;