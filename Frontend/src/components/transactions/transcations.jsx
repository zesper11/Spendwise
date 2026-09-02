import { useState } from "react";
import { useEffect } from "react";
import "./transcations-new.css";

const Transctions = () => {
  const [income, setIncome] = useState([]);

  const importIncome = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/get-income");
      const data = await response.json();

      setIncome(data);
    } catch {
      console.error("error occurred");
    }
  };

  const [expense, setExpense] = useState([]);

  const importExpense = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/get-expenses");
      const data = await response.json();

      setExpense(data);
    } catch {
      console.error("error occurred");
    }
  };

  useEffect(() => {
    importIncome();
    importExpense();
  }, []);

  let totalExpenseAmount = 0;

  expense.forEach(
    (exp) => (totalExpenseAmount = totalExpenseAmount + exp.amount),
  );

  let totalIncomeAmount = 0;

  income.forEach((inc) => (totalIncomeAmount = totalIncomeAmount + inc.amount));

  return (
    <section className="transactions-container">
      <div className="summary-section">
        <div className="summary-cards">
          <div className="summary-card income-card">
            <p className="summary-label">Total Income</p>
            <h3 className="summary-amount">${totalIncomeAmount.toFixed(2)}</h3>
          </div>
          <div className="summary-card expense-card">
            <p className="summary-label">Total Expense</p>
            <h3 className="summary-amount">${totalExpenseAmount.toFixed(2)}</h3>
          </div>
        </div>

        <div className="net-worth-section">
          <p className="net-worth-label">Net Balance</p>
          <div
            className={`net-worth-display ${totalIncomeAmount > totalExpenseAmount || totalIncomeAmount == 0 ? "profit" : "loss"}`}
          >
            <span className="status-badge">
              {totalIncomeAmount > totalExpenseAmount || totalIncomeAmount == 0
                ? "Profit"
                : "Loss"}
            </span>
            <h2 className="net-amount">
              ${(totalIncomeAmount - totalExpenseAmount).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>

      <div className="transactions-sections">
        <div className="transactions-section incomes-section">
          <h3 className="section-title">Income Transactions</h3>
          <div className="transactions-list">
            {income.length > 0 ? (
              income.map((inc) => (
                <article
                  className="transaction-card income-transaction"
                  key={inc._id}
                >
                  <div className="card-header">
                    <h4 className="card-title">{inc.title}</h4>
                    <span className="card-amount income-amount">
                      +${inc.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="card-description">{inc.description}</p>
                </article>
              ))
            ) : (
              <p className="no-data">No income transactions</p>
            )}
          </div>
        </div>

        <div className="transactions-section expenses-section">
          <h3 className="section-title">Expense Transactions</h3>
          <div className="transactions-list">
            {expense.length > 0 ? (
              expense.map((exp) => (
                <article
                  className="transaction-card expense-transaction"
                  key={exp._id}
                >
                  <div className="card-header">
                    <h4 className="card-title">{exp.title}</h4>
                    <span className="card-amount expense-amount">
                      -${exp.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="card-description">{exp.description}</p>
                </article>
              ))
            ) : (
              <p className="no-data">No expense transactions</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transctions;
