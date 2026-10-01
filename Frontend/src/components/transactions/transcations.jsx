import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { apiFetch } from "../../utils/api";
import "./transcations-new.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const Transctions = () => {
  const [income, setIncome] = useState([]);

  const [expense, setExpense] = useState([]);

  useEffect(() => {
    let active = true;
    Promise.all([apiFetch("/get-income"), apiFetch("/get-expenses")])
      .then(([incomeData, expenseData]) => {
        if (!active) return;
        setIncome(incomeData);
        setExpense(expenseData);
      })
      .catch((error) => console.error(error.message));
    return () => {
      active = false;
    };
  }, []);

  const cashflow = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 5 + index,
        1,
      );
      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: date.toLocaleDateString("en", { month: "short" }),
        income: 0,
        expense: 0,
      };
    });
    const monthIndex = new Map(
      months.map((month, index) => [month.key, index]),
    );
    [...income, ...expense].forEach((transaction) => {
      const date = new Date(transaction.date);
      const index = monthIndex.get(`${date.getFullYear()}-${date.getMonth()}`);
      if (index === undefined) return;
      if (transaction.type === "income")
        months[index].income += Number(transaction.amount) || 0;
      else months[index].expense += Number(transaction.amount) || 0;
    });
    return months;
  }, [income, expense]);

  const chartData = {
    labels: cashflow.map((month) => month.label),
    datasets: [
      {
        label: "Income",
        data: cashflow.map((month) => month.income),
        borderColor: "#268267",
        backgroundColor: "#26826716",
        pointBackgroundColor: "#268267",
        pointRadius: 3,
        tension: 0.35,
        fill: true,
      },
      {
        label: "Expenses",
        data: cashflow.map((month) => month.expense),
        borderColor: "#d8755f",
        backgroundColor: "#d8755f10",
        pointBackgroundColor: "#d8755f",
        pointRadius: 3,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 7,
          boxHeight: 7,
          color: "#66736c",
          font: { family: "Plus Jakarta Sans", size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: $${Number(context.raw).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#87918b" },
      },
      y: {
        beginAtZero: true,
        border: { display: false, dash: [3, 4] },
        grid: { color: "#edf0ec" },
        ticks: { color: "#87918b", callback: (value) => `$${value}` },
      },
    },
  };

  let totalExpenseAmount = 0;

  expense.forEach(
    (exp) => (totalExpenseAmount = totalExpenseAmount + exp.amount),
  );

  let totalIncomeAmount = 0;

  income.forEach((inc) => (totalIncomeAmount = totalIncomeAmount + inc.amount));

  return (
    <section className="transactions-container">
      <header className="dashboard-heading">
        <div>
          <span className="dashboard-kicker">YOUR MONEY, AT A GLANCE</span>
          <h1>Overview</h1>
          <p>Income and spending, all in one place.</p>
        </div>
        <span className="dashboard-period">LAST 6 MONTHS</span>
      </header>
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

      <section className="cashflow-panel" aria-label="Income and expense chart">
        <div className="cashflow-heading">
          <div>
            <h3>Cashflow</h3>
            <p>Monthly income compared with expenses</p>
          </div>
          <span>6 MONTH TREND</span>
        </div>
        <div className="cashflow-chart">
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>

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
