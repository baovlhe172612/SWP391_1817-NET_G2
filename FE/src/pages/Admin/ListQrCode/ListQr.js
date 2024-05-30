import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { get } from "../../../helpers/API.helper";
import Qr from "../../../components/Admin/QR/Qr";
import { TABLE } from "../../../helpers/APILinks";
import Pagination from "../../../components/Mixin/Pagination/Pagination";

function ListQr() {
  const [qrs, setQrs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // pagination table
  const paginationTable = {
    currentPage: currentPage,
    item: 24,
    skip: (currentPage - 1) * 24,
    countPage: 0,
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(TABLE);

        if (data) {
          setQrs(data);
          // console.log(data)
        }
      } catch (error) {
        console.log("err in ListQr", error);
        setQrs([]);
      }
    };

    fetchApi();
  }, []);

  // page = 1 => 24
  // page = 2 => 24 => 48
  // pagination: count / 24 + 1
  // skip: (n - 1) * 24

  return (
    <>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {qrs.length > 0 &&
          qrs.map((qr) => (
            <>
              <Qr key={qr.tableId} qr={qr} />
            </>
          ))}

        <Col xl={16} md={16}></Col>
        <Col xl={8} md={8}>
          <Pagination />
        </Col>
      </Row>
    </>
  );
}

export default ListQr;
