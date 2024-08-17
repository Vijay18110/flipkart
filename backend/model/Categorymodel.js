const mongoose = require("mongoose");
const categorymodel = mongoose.model(
    "categoryeshop",
    new mongoose.Schema({
        categoryname: { type: String, require: true },
        categorypic: { type: String, require: true }
    })
);
module.exports = categorymodel;