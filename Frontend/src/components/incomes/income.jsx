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

    await fetch("http://localhost:5000/api/v1/add-income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(income),
    });

    console.log(income);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Salary" />

      <input name="amount" placeholder="$4600" />

      <select name="category">
        <option value="food">Salary</option>
        <option value="transport">Investment</option>
      </select>

      <input type="date" name="date" />

      <textarea name="description" />

      <button type="submit">Add Incomes</button>
    </form>
  );
};

export default Incomes;
