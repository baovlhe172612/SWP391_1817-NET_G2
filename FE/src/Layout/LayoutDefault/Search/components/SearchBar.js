import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(null);

  const fetchData = (value) => {
    fetch("http://localhost:5264/api/ProductControlles")
      .then((response) => response.json())
      .then(json => {
        const results = json.filter((product) => {
          return (
            value &&
            product &&
            product.productName &&
            product.productName.toLowerCase().includes(value)
          );
        });
        // console.log(results);
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    clearTimeout(timer); // Xóa bỏ timeout hiện tại (nếu có)
    if (value.length >= 2) {
      // Chỉ fetch dữ liệu khi độ dài của value >= 2
      const newTimer = setTimeout(() => {
        fetchData(value);
      }, 1000); // Chờ 1 giây trước khi fetch dữ liệu
      setTimer(newTimer); // Lưu timeout mới
    } else {
      // Nếu độ dài của value < 2, không cần fetch dữ liệu
      setResults([]);
    }
  };

  return (
    <div className='input-wrapper'>
      <FaSearch id='search-icon' />
      <input
        placeholder='Type to search....'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
