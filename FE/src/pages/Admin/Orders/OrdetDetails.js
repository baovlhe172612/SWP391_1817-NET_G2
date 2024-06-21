import React, { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import { LIST_ORDERDETAILS } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { storeId,orderId } = useParams();
  console.log("storeId:",storeId,"and orderId: ",orderId )
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchApi = async () => {
    try {
      const data = await get(`${LIST_ORDERDETAILS}/${storeId}/${orderId}`);
      console.log("Data fetched:", data);
      setOrderDetails(data);
    } catch (error) {
      message.error("Error fetching account details");
      console.log("Error in DetailEmployee:", error);
      setOrderDetails(null);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
    const columns = [
        {
          title: "Order ID",
          dataIndex: "orderID",
          key: "orderID",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Store Name",
          dataIndex: "storeName",
          key: "storeName",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Table",
          dataIndex: "tableName",
          key: "tableName",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Name",
          dataIndex: "productName",
          key: "productName",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Size",
          dataIndex: "sizeName",
          key: "ordesizeNamerID",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          render: (text) => <a>{text}</a>, // custom text
        },
      
      ];
    
  
    
      return (
        <>
          <Table columns={columns} dataSource={orderDetails} rowKey="id" />
         
        </>
      );
}

export default OrderDetails