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

    await fetch("http://localhost:5000/api/v1/add-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    console.log(expense);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Burger" />

      <input name="amount" placeholder="$10" />

      <select name="category">
        <option value="food">Food</option>
        <option value="transport">Transport</option>
      </select>

      <input type="date" name="date" />

      <textarea name="description" />

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default Expenses;
