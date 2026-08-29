const router = require('express').Router()
const { addIncome, getIncome, deleteIncome } = require('../controller/income')
const {addExpense, getExpense, deleteExpense} = require('../controller/expense')


router.post('/add-income', addIncome)
router.get('/get-income', getIncome)
router.delete('/delete-income/:id', deleteIncome)
router.post('/add-expense', addExpense)
router.get('/get-expenses', getExpense)
router.delete('/delete-expenses/:id', deleteExpense)

module.exports = router