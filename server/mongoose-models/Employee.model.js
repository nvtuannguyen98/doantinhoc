const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

/**
 * @private : will be changed in the future
 */
const EmployeeSchema = new mongoose.Schema({
    email: String,
    name: String,
    phoneNumber: String,
    password: String,
    address: String,
})

module.exports = {
    EmployeeModel: mongoose.model('Employee', EmployeeSchema, 'Employee'),
}
