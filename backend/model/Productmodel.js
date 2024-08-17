const mongoose = require("mongoose");
const productModel = mongoose.model(
    "products",
    new mongoose.Schema({
        subcategoryid: { type: String, require: true },
        productname: { type: String, require: true },
        productpic: { type: String, require: true },
        price: { type: Number, require: true },
        offerprice: { type: Number, require: true },
        desc: { type: String, require: true },
    })
);
module.exports = productModel;