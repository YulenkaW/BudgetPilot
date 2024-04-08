import React, { useState } from 'react';

const ExpenseCategory = ({ onSelectCategory }) => {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = () => {
    onSelectCategory(category);
    setCategory('');
  };

  return (
    <div>
      <label htmlFor="category">Select Category: </label>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option value="">Choose a category</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Others">Others</option>
      </select>
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

export default ExpenseCategory;
