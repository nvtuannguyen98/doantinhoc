const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const StockSchema = new mongoose.Schema({
    name: String,
    categoryId: {
        type: ObjectId,
        ref: 'Category',
    },
    price: Number,
    dealPrice: Number,
    url: String,
    description: String,
})

module.exports = {
    StockModel: mongoose.model('Stock', StockSchema, 'Stock'),
}
