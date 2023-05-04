const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    _id: {type: Number},
    title: {type: String},
    price: {type: Number},
    category: {type: String},
    image: {type: String}
} ,
{ collection: "restaurant_catalog" }
);

const Product = mongoose.model('Product', ReactFormDataSchema);
module.exports = Product;