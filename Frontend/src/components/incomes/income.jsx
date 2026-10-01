import "../forms-new.css";
import { apiFetch } from "../../utils/api";

const Incomes = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const income = {
      title: e.target.title.value,
      amount: e.target.amount.value,
      category: e.target.category.value,
      date: e.target.date.value,
      description: e.target.description.value,
    };

    try {
      await apiFetch("/add-income", {
        method: "POST",
        body: JSON.stringify(income),
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
            <h2>Add Income</h2>
            <p>Record your earnings</p>
          </div>

          <div className="form-group">
            <label htmlFor="title">Income Source</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Salary, Freelance, Bonus"
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
              <option value="salary">💼 Salary</option>
              <option value="investment">📈 Investment</option>
              <option value="freelance">💻 Freelance</option>
              <option value="bonus">🎁 Bonus</option>
              <option value="gift">🎀 Gift</option>
              <option value="refund">↩️ Refund</option>
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
              placeholder="Add notes about this income..."
            />
          </div>

          <button type="submit">Add Income</button>
        </form>
      </div>
    </div>
  );
};

export default Incomes;
