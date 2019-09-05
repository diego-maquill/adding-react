const express = require('express');
const router = express.Router();
const popup = require('window-popup').windowPopup;
const xss = require('xss');
const data = require('../../../models');
const usersData = data.users;
const orderTransaction = data.transactionOrder;
const passport = require('../../../config/passport-users');

/* local scoped functions */
//------ check user authenticity
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render('alerts/error', {
            mainTitle: "Page Not Found •",
            code: 404,
            message: "Page Not Found",
            url: req.originalUrl,
            user: req.user
        });
    }
}

//------------------------ route to fetch user order information by email id
router.get('/', isLoggedIn, (req, res) => {
    orderTransaction.getAllTransactionByUserId(req.user._id).then((transactions) => {
            let transactionsList = transactions.reverse().slice(0, 10);

            res.render('users/gui/all-user-orders', {
                mainTitle: "Dashboard • Order History •",
                user: req.user,
                transactions: transactionsList
            });
        })
        .catch((error) => { // rendering error page
            res.render('alerts/error', {
                mainTitle: "Server Error •",
                code: 500,
                message: error,
                url: req.originalUrl
            });
        });
});

// exporting routing apis
module.exports = router;