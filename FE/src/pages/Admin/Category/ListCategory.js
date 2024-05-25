import React,{ useEffect, useState } from 'react'
import { Space, Table, Tag } from "antd";
import { get } from '../../../helpers/API.helper';
function ListCategory() {
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get("http://localhost:5264/api/Category");
      //
      console.log(data);

      setCategory(data);
    };

    fetchApi();
  }, []);
  
  const columns = [
    {
      title: "Category ID",
      dataIndex: "categoryId",
      key: "categoryId",
      // render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      // render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "isDelete",
      dataIndex: "isDelete",
      key: "isDelete",
      // render: (text) => <a>{text}</a>, // custom text
    },

  ];


  

  return (
    <>
      <Table columns={columns} dataSource={Category} />
    </>
  );
}

export default ListCategory