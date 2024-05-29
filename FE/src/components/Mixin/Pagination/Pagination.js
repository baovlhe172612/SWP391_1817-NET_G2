import React from "react";
import { Pagination } from "antd";

const PaginationDesign = () => {
  return (
    <>
      <Pagination defaultCurrent={1} total={50} style={{marginTop: "20px"}}/>
    </>
  );
};

export default PaginationDesign;
