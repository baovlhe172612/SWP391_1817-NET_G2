import React, { useRef } from 'react';
import "./SearchResult.css";
import { Link } from "react-router-dom";

export const SearchResult = ({ result }) => {
  const inputRef = useRef(null); // Tạo ref cho ô input

  const handleClick = () => {
    inputRef.current.blur(); // Khi click vào SearchResult, ô input sẽ mất focus
   
  };

  return (
    <Link to={`/productDetail?productId=${
      result.productId
    }&sizeId=${1}`} className='search-result' onClick={handleClick}>
      <div className="product-info">
        <img src={result.img} alt={result.productName} className="product-image" />
        <div className="product-details">
          <div className="product-name">{result.productName}</div>
          <div className="product-price">{result.price + 10000}đ</div>
        </div>
      </div>
    </Link>
  );
};
