import React, { useState } from 'react';
import "./SearchResultsList.css";
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({results}) => {
  return (
  <div className={`result-list ${results.length > 0 ? 'show' : ''}`}>
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
};
