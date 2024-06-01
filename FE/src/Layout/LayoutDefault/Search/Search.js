
import React, { useState } from 'react';
import './Search.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultList';
function Search() {
  const [results, setResults] = useState([]);

  return (
    <div className='Search'>
      <div className='search-bar-container'>
            <SearchBar setResults={setResults} />
             <SearchResultsList results={results} />
      </div>
    </div>
  );
}

export default Search; 

//xóa default thì thêm dấu ngoặc
