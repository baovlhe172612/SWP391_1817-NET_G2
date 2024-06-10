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
    }&sizeId=${result.sizeId}&categoryId=${result.category}`} className='search-result' onClick={handleClick}>
      <div className="product-info">
        <img src={result.img} alt={result.productName} className="product-image" />
        <div className="product-details">
          <div className="product-name">{result.productName} Size {result.sizeName}</div>
          <div className="product-price">{result.price}đ</div>
        </div>
      </div>
    </Link>
  );
};
