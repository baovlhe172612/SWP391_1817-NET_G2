import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { LIST_PRODUCT_SIZE } from '../../../helpers/APILinks';

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(null);

  const fetchData = (value) => {
    fetch(`${LIST_PRODUCT_SIZE}`)
      .then((response) => response.json())
      .then(json => {
        const results = json.filter((product) => {
          return (
            value &&
            product &&
            product.productName &&
            product.productName.toLowerCase().includes(value.toLowerCase())
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
      }, 500); // Chờ 1 giây trước khi fetch dữ liệu
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
        placeholder='Search product....'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
