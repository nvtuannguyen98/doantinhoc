const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const CategorySchema = new mongoose.Schema({
    name: String,
    url: String,
})

module.exports = {
    CategoryModel: mongoose.model('Category', CategorySchema, 'Category'),
}
