
const Income = require("../models/income.model")

exports.addIncome = async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body

        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'You must fill all the required information'})
        }

        if(!Number.isFinite(Number(amount)) || Number(amount) <= 0){
             return res.status(400).json({message: 'Please enter valid amount'})
        }

        const income = new Income({
            title,
            amount: Number(amount),
            category,
            description,
            date,
        })

        await income.save()
        return res.status(201).json({message: 'Income added successfully', income})
    } catch (error) {
        return res.status(500).json({message: 'Unable to add income', error: error.message})
    }
}


exports.getIncome = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 })
        return res.status(200).json(incomes)
    } catch (error) {
        return res.status(500).json({ message: 'Unable to fetch income', error: error.message })
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findByIdAndDelete(req.params.id)

        if (!income) {
            return res.status(404).json({ message: 'Income not found' })
        }

        return res.status(200).json({ message: 'Income deleted' })
    } catch (error) {
        return res.status(500).json({ message: 'Unable to delete income', error: error.message })
    }
}