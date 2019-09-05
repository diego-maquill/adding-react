const contactsData = require('./contacts');
const credentialsData = require('./credentials');
const productsData = require('./products');
const subscriptionsData = require('./subscriptions');
const transactionOrderData = require('./transactionOrder');
const transactionWalletData = require('./transactionWallet');
const usersData = require('./users');
const shoppersData = require('./shoppers');
//const shoppersCartData = require('./shoppersCart');
const usersCardData = require('./usersCard');
const usersCartData = require('./usersCart');
const usersWalletData = require('./usersWallet');

let dataMethod = (app) => {
    app.use("/contacts-us", contactsData);
    app.use("/credentials", credentialsData);
    app.use("/products", productsData);
    app.use("/subscription", subscriptionsData);
    app.use("/user", usersData);
    app.use("./shopper", shoppersData);
};

module.exports = {
    contacts: require('./contacts'),
    credentials: require('./credentials'),
    products: require('./products'),
    subscriptions: require('./subscriptions'),
    transactionOrder: require('./transactionOrder'),
    transactionWallet: require('./transactionWallet'),
    shoppers: require('./shoppers'),
    // shoppersCart: require('./shoppersCart'),
    users: require('./users'),
    usersCard: require('./usersCard'),
    usersCart: require('./usersCart'),
    usersWallet: require('./usersWallet')
};