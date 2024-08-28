const mongoose = require("mongoose");
const cardModel = mongoose.model(
    "cards",
    new mongoose.Schema({
        username: { type: String, require: true },
        productname: { type: String, require: true },
        price: { type: Number, require: true },
        offerprice: { type: Number, require: true },
        productpic: { type: String, require: true },
        pid: { type: String, require: true },
        quantity: { type: String, require: true },

    })
);
module.exports = cardModel;