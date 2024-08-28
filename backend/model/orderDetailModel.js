const mongoose = require("mongoose");
const orderdetailmodel = mongoose.model(
    "orderdetails",
    new mongoose.Schema({
        productname: { type: String, require: true },
        username: { type: String, require: true },

        price: { type: Number, require: true },
        quantity: { type: String, require: true },
        price: { type: Number, require: true },
        productpic: { type: String, require: true },
        orderno: { type: String, require: true },

    })
);
module.exports = orderdetailmodel;