const Employee = require('./Employee.model')
const Category = require('./Category.model')
const Stock = require('./Stock.model')
const Customer = require('./Customer.model')
module.exports = {

    // Employee
    EmployeeModel: Employee.EmployeeModel,

    // Category
    CategoryModel: Category.CategoryModel,

    // Stock
    StockModel: Stock.StockModel,

    //Customer
    CustomerModel: Customer.CustomerModel,

}
