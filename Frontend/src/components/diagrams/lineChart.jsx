import { useEffect, useState } from "react";
import "./diagrams-new.css";

const LineChart = () => {
  const [income, setIncome] = useState([]);
  const [currentMonthIncome, setCurrentMonthIncome] = useState([]);

  useEffect(() => {
    const importIncome = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/get-income");
        const data = await response.json();

        setIncome(data);
      } catch {
        console.error("error occurred");
      }
    };

    importIncome();
  }, []);

  useEffect(() => {
    const currentMonthIncomeData = income.filter((inc) => {
      if (!inc?.date) return false;

      const date = new Date(inc.date);

      if (Number.isNaN(date.getTime())) return false;

      return (
        date.getFullYear() === new Date().getFullYear() &&
        date.getMonth() === new Date().getMonth() + 1
      );
    });

    setCurrentMonthIncome(currentMonthIncomeData);
  }, [income]);

  return (
    <div className="diagrams-container">
      <div className="section-header">
        <h2>Income Overview</h2>
        <p>Track your income streams and monthly trends</p>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">All Income</h3>
          {income.length > 0 ? (
            <ul className="data-list">
              {income.map((inc) => (
                <li key={inc._id} className="data-item income">
                  <div className="data-item-content">
                    <p className="data-item-title">{inc.title}</p>
                  </div>
                  <span className="data-item-amount">
                    ${inc.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>No income data available yet</p>
            </div>
          )}
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Current Month</h3>
          {currentMonthIncome.length > 0 ? (
            <ul className="data-list">
              {currentMonthIncome.map((inc) => (
                <li key={inc._id} className="data-item income">
                  <div className="data-item-content">
                    <p className="data-item-title">{inc.title}</p>
                  </div>
                  <span className="data-item-amount">
                    ${inc.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>No income for this month yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineChart;
