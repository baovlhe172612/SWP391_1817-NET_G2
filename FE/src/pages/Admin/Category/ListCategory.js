import React,{ useEffect, useState } from 'react'
import { Space, Table, Tag } from "antd";
import { get } from '../../../helpers/API.helper';
function ListCategory() {
  const columns = [
    {
      title: "Category ID",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>, // custom text
    },


  ];

  const [Category, setCategory] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get("http://localhost:5264/api/Account");
      //
      console.log(data);

      setCategory(data);
    };

    fetchApi();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={Category} />
    </>
  );
}

export default ListCategory