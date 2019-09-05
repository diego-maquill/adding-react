/* importing required files and packages */
const uuid = require('uuid');
const xss = require('xss');
const mongoDbCollection = require('../config/mongodb-collection');
const products = mongoDbCollection.products;

/* exporting controllers apis */
module.exports = productsControllers = {

    //------------------------ fetch a product information by email id
    getProductById: (id) => {
        return products().then((productsCollection) => { // returning a found json document else returning null
            return productsCollection.findOne({
                _id: id
            });
        })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'products' collection1.");
            });
    },

    //------------------------ fetch a product information by email id
    getProductByCategory: (category) => {
        return products().then((productsCollection) => { // returning a found json document else returning null
            return productsCollection.find({
                category: {
                    $regex: `.*${category}.*`,
                    $options: 'i'
                }
            }).toArray();
        })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'products' collection2.");
            });
    },

    //------------------------ fetch a product information by search string
    getProductBySearch: (keyword) => {
        return products().then((productsCollection) => { // returning a found json document else returning null

            let query = [{
                _id: keyword
            },
            {
                name: {
                    $regex: `.*${keyword}.*`,
                    $options: 'i'
                }
            },
            {
                description: {
                    $regex: `.*${keyword}.*`,
                    $options: 'i'
                }
            }
            ];

            return productsCollection.find({
                $or: query
            }).toArray();
        })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'products' collection3.");
            });
    },

    //------------------------ fetch a product information by search string
    getProductBySearchFilter: (keyword, startRange, endRange) => {
        return products().then((productsCollection) => { // returning a found json document else returning null

            let query = [{
                _id: keyword
            },
            {
                name: {
                    $regex: `.*${keyword}.*`,
                    $options: 'i'
                }
            },
            {
                description: {
                    $regex: `.*${keyword}.*`,
                    $options: 'i'
                }
            }
            ];


            return productsCollection.find({
                $or: query,
                price: {
                    $gte: startRange,
                    $lte: endRange
                }
            }, {
                    _id: 1,
                    name: 1,
                    price: 1,
                    images: 1,
                    stock: 1
                }).toArray();
        })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'products' collection4.");
            });
    },

    //------------------------ fetch a product information by filter string
    getProductByFilter: (category, startRange, endRange) => {
        return products().then((productsCollection) => {
            return productsCollection.find({
                category: {
                    $regex: `.*${category}.*`,
                    $options: 'i'
                },
                price: {
                    $gte: startRange,
                    $lte: endRange
                }
            }, {
                    _id: 1,
                    name: 1,
                    category: 1,
                    price: 1,
                    images: 1
                }).toArray();
        })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'products' collection5.");
            });
    },
    // 
    //------------------------ fetch all product information
    getAllProducts: () => {
        // console.log('proddddd colll===>>>', productsCollection)
        return products().then((productsCollection) => { // returning a found json document else returning null
            return productsCollection.find({}).toArray();
        })
            .catch(err => { // returning a reject promise
                return Promise.reject(`Server issue with 'products' collection6==>>>: ${JSON.stringify(err)}`);
            });
    },

    //------------------------ insert/create a new product record
    addNewProduct: (name, price, description, images, stock, size) => {
        return products().then((productsCollection) => {

            // new product object
            let newProduct = {
                _id: uuid.v4(),
                name: xss(name),
                description: xss(description),
                price: parseFloat(xss(price)),
                description: xss(description),
                images: images,
                stock: xss(stock),
                size: xss(size),
            }

            // adding a record in to the collection
            return productsCollection.insertOne(newProduct)
                .then((newProductInformation) => {
                    return newProductInformation.insertedId;
                });
        })
            .catch(() => { // returning a reject promise
                return Promise.reject("Server issue with 'products' collection7.");
            });
    },
};