
const Expense = require("../models/expense.model")

exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body

        if(!title || !category || !date){
            return res.status(400).json({message: 'You must fill all the required information'})
        }

        if(!Number.isFinite(Number(amount)) || Number(amount) <= 0){
             return res.status(400).json({message: 'Please enter valid amount'})
        }

        const expense = new Expense({
            userId: req.userId,
            title,
            amount: Number(amount),
            category,
            description: description || '',
            date,
        })

        await expense.save()
        return res.status(201).json({message: 'Expense added successfully', expense})
    } catch (error) {
        return res.status(500).json({message: 'Unable to add expense', error: error.message})
    }
}


exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.userId }).sort({ createdAt: -1 })
        return res.status(200).json(expenses)
    } catch (error) {
        return res.status(500).json({ message: 'Unable to fetch expense', error: error.message })
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId })

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' })
        }

        return res.status(200).json({ message: 'Expense deleted' })
    } catch (error) {
        return res.status(500).json({ message: 'Unable to delete expense', error: error.message })
    }
}