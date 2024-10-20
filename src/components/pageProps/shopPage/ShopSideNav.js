import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopSideNav = ({ onCategoryChange }) => {
  const host = "http://localhost:7001";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${host}/category/view`)
      .then((res) => {
        console.log("Categories fetched:", res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  return (
    <div className="w-full bg-gray-100 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category._id}
            className="cursor-pointer hover:text-primeColor"
            onClick={() => onCategoryChange(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopSideNav;
