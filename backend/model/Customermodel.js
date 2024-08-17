const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:
        String,
    email: String,
    password: String,
})
const CustomerModel = mongoose.model('customer', userSchema);
module.exports = CustomerModel;
