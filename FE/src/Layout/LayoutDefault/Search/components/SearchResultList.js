import React, { useState } from 'react';
import "./SearchResultsList.css";
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({results}) => {
  return (
    <div className='result-list'>
      {results.map((results, id) => {
        return <SearchResult result={results} key={id}/>;
      })}
    </div>
  );
};
