import "../forms-new.css";
import { apiFetch } from "../../utils/api";

const Expenses = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      title: e.target.title.value,
      amount: e.target.amount.value,
      category: e.target.category.value,
      date: e.target.date.value,
      description: e.target.description.value,
    };

    try {
      await apiFetch("/add-expense", {
        method: "POST",
        body: JSON.stringify(expense),
      });
      e.target.reset();
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Add Expense</h2>
            <p>Track your spending easily</p>
          </div>

          <div className="form-group">
            <label htmlFor="title">Expense Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Groceries, Gas, Dinner"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="food">🍔 Food</option>
              <option value="transport">🚗 Transport</option>
              <option value="utilities">💡 Utilities</option>
              <option value="entertainment">🎬 Entertainment</option>
              <option value="healthcare">🏥 Healthcare</option>
              <option value="shopping">🛍️ Shopping</option>
              <option value="other">📌 Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              placeholder="Add notes about this expense..."
            />
          </div>

          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default Expenses;
