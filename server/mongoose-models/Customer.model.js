const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const CustomerSchema = new mongoose.Schema({
    email: String,
    name: String,
    phoneNumber: String,
    password: String,
    address: String,
    customerType: String,
})  

module.exports = {
    CustomerModel: mongoose.model('Customer', CustomerSchema, 'Customer'),
}
