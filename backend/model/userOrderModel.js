const mongoose = require("mongoose");
const userordermodel = mongoose.model(
    "order",
    new mongoose.Schema({
        amount: { type: String, require: true },
        username: { type: String, require: true },
        name: { type: String, require: true },
        address: { type: String, require: true },
        mobile: { type: Number, require: true },
        date: { type: String, require: true },
        status: { type: String, require: true },

    })
);
module.exports = userordermodel;