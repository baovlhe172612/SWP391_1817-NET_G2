import React from "react";
import { Pagination } from "antd";

const PaginationDesign = () => {
  return (
    <>
      <Pagination defaultCurrent={1} total={50} style={{margin: "0 0 0 60%"}}/>
    </>
  );
};

export default PaginationDesign;
