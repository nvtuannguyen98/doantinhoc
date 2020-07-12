const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const AdminSchema = new mongoose.Schema({
    email: String,
    name: String,
    phoneNumber: String,
    password: String,
    address: String,
})

module.exports = {
    AdminModel: mongoose.model('Admin', AdminSchema, 'Admin'),
}
