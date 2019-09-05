/* Users Collection
 * Users Controllers *
 * Data Access Object *
 * Shoppers Controllers for DAO actions *
/* importing required files and packages */
const mongoDbCollection = require('../config/mongodb-collection');
const shoppers = mongoDbCollection.shoppers;

//------ create alias of name
function makeAlias(name) {

    let alias = "";
    for (var i = 0; i < name.length; i++) {
        if ((name.charCodeAt(i) >= 65 && name.charCodeAt(i) <= 90) || (name.charCodeAt(i) >= 97 && name.charCodeAt(i) <= 122)) {
            alias += name.charAt(i);
        } else if (name.charCodeAt(i) == 32 || name.charCodeAt(i) == 46 || name.charAt(i) == 44) {
            break;
        }
    }

    return alias;
}

/* exporting controllers apis */
module.exports = shoppersControllers = {

    //------------------------ fetch a Shopper information by email id
    getShopperById: (email) => {
        return shoppers().then((usersCollection) => { // returning a found json document else returning null
                return usersCollection.findOne({
                    _id: email
                }, {
                    _id: 1,
                    name: 1,
                    alias: 1,
                    mobile: 1,
                    cart: 1,
                    cartLen: 1,
                    card: 1,
                    wallet: 1
                });
            })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'shoppers' collection.");
            });
    },

    //------------------------ insert/create a new Shopper record
    createNewUser: (name, email, mobile) => {
        return shoppers().then((usersCollection) => {

                var alias = makeAlias(name);

                // new Shopper object
                let newShopper = {
                    _id: email,
                    name: name,
                    alias: alias,
                    mobile: mobile,
                    regDate: new Date().toUTCString()
                }

                // adding a record in to the collection
                return usersCollection.insertOne(newShopper)
                    .then((newShopperInformation) => {
                        return newShopperInformation.insertedId;
                    })
                    .then((newShopperId) => { // returning created Shopper document
                        return shoppersControllers.getShopperById(newShopperId);
                    })
            })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'shoppers' collection.");
            });
    },

    //------------------------  update an existing shopper profile information
    updateProfile: (email, name, mobile) => {
        return shoppers().then((usersCollection) => {

                let shopperChanges = {};

                // checking for values to update
                if (name) {
                    shopperChanges['name'] = name;
                    shopperChanges['alias'] = makeAlias(name);
                }

                if (mobile) {
                    shopperChanges['mobile'] = mobile;
                }

                // updating shopper information into the collection
                return usersCollection.updateOne({
                    _id: email
                }, {
                    $set: shopperChanges
                }).then(() => {
                    return shoppersControllers.getShopperById(email);
                });
            })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'shoppers' collection.");
            });
    },

    //------------------------  update an existing shopper wallet information
    /*  updateWallet: (email, newCash, availableCash) => {
         return shoppers().then((usersCollection) => {

                 let shopperChanges = {};

                 // checking for values to update
                 if (newCash) {
                     shopperChanges['wallet'] = newCash + availableCash;
                 }

                 // updating shopper information into the collection
                 return usersCollection.updateOne({
                     _id: email
                 }, {
                     $set: shopperChanges
                 }).then(() => {
                     return shoppersControllers.getShopperById(email);
                 });
             })
             .catch(() => { // returning a reject promise
                 return Promise.reject("Server issue with 'shoppers' collection.");
             });
     }, */

    //------------------------ delete a shopper record of specific id from shoppers collection
    deleteShopper: (email) => {
        return shoppers().then((usersCollection) => {
                return usersCollection.removeOne({
                        _id: email
                    })
                    .then((deletedShopperInformation) => {
                        if (deletedShopperInformation.deletedCount === 0) {
                            return Promise.reject(`No result having id ${email} from shoppers collection`);
                        }
                    });
            })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'shoppers' collection.");
            });
    }
};