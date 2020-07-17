const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const OrderSchema = new mongoose.Schema({
    customerId: ObjectId,
    stocks: {
        type: [{
            stockId: ObjectId,
            amount: Number,
        }]
    },
    totalPrice: Number,
    address: String,
    status: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = {
    OrderModel: mongoose.model('Order', OrderSchema, 'Order'),
}
