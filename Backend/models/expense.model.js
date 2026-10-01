const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    amount:{
        type: Number,
        required: true,
        maxLength: 20,
        trim: true,
    },

    type:{
        type: String,
        default: "expense"
    },

    date:{
        type: Date,
        required: true,
        maxLength: 20,
        trim: true,
    },

    category:{
        type: String,
        required: true,
        trim: true,
    },

    description:{
        type: String,
        default: '',
        maxLength: 200,
        trim: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)
