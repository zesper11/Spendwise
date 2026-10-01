import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../utils/api";
import "./diagrams-new.css";

const LineChart = () => {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const importIncome = async () => {
      try {
        setIncome(await apiFetch("/get-income"));
      } catch (error) {
        console.error(error.message);
      }
    };

    importIncome();
  }, []);

  const currentMonthIncome = useMemo(
    () =>
      income.filter((inc) => {
        if (!inc?.date) return false;

        const date = new Date(inc.date);

        if (Number.isNaN(date.getTime())) return false;

        return (
          date.getFullYear() === new Date().getFullYear() &&
          date.getMonth() === new Date().getMonth()
        );
      }),
    [income],
  );

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
