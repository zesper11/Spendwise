import { useEffect, useState } from "react";

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
    <>
      <ul>
        {income.map((inc) => (
          <li key={inc._id}>{inc.title}</li>
        ))}
      </ul>
      <h2>Current Month</h2>
      <ul>
        {currentMonthIncome.map((inc) => (
          <li key={inc._id}>{inc.title}</li>
        ))}
      </ul>
    </>
  );
};

export default LineChart;
