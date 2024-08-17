const mongoose = require("mongoose");
const subcatmodel = mongoose.model(
    "subcategory",
    new mongoose.Schema({
        categoryid: { type: String, require: true },
        subcategoryname: { type: String, require: true },
        subcategorypic: { type: String, require: true },
    })
);
module.exports = subcatmodel;