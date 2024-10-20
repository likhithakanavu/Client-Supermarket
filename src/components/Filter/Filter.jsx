import React, { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    notifyFilterChange(e.target.value, maxPrice);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    notifyFilterChange(minPrice, e.target.value);
  };

  const notifyFilterChange = (minPrice, maxPrice) => {
    // Notify parent component of filter changes
    onFilterChange({
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="0"
        />
      </div>
      <div className="filter-item">
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="1000"
        />
      </div>
    </div>
  );
};

export default Filter;
