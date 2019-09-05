/* database collection configuration */
const dbConnection = require('./mongodb-connection');
//dbConnection();
//let db = 'heroku_sl83bd7s';
/* This will allow to have one reference to each collection per app */
let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {

            _col = dbConnection().then((db) => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}

/* listing collections here: */
module.exports = {
    contacts: getCollectionFn("contacts"),
    credentials: getCollectionFn("credentials"),
    products: getCollectionFn("products"),
    subscriptions: getCollectionFn("subscriptions"),
    transactionOrder: getCollectionFn("orderTransaction"),
    transactionWallet: getCollectionFn("walletTransaction"),
    users: getCollectionFn("users"),
    shoppers: getCollectionFn("shoppers"),
};