import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { get } from "../../../helpers/API.helper";
import { SEARCH_STORE } from "../../../helpers/APILinks";

function SearchStore() {
  const [search] = useSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const searchName = search.get(`name`);
      try {
        const dataSearch = await get(`${SEARCH_STORE}?name=${searchName}`);
        console.log(dataSearch)
        setData(dataSearch);
      } catch (error) {
        console.log(error, `SearchStore`);
        setData([]);
      }
    };

    fetchApi();
  }, [search]);
  
  return <div>SearchStore</div>;
}

export default SearchStore;
