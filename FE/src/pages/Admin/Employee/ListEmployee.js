import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { LIST_Employee } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";

function ListEmployee() {
  const [AccountEmployee, setAccountEmployee] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(LIST_Employee);
        //
        setAccountEmployee(data);
      } catch (error) {
        console.log("Err tại ListStoreManager", error);
        setAccountEmployee([]);
      }
    };

    fetchApi();
  }, []);
  
  const columns = [
    {
      title: "AccountID",
      dataIndex: "accountId",
      key: "accountId",
      // Custom text rendering
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      // Custom text rendering
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "user",
    },
    {
      title: "Password",
      dataIndex: "passWord",
      key: "password",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusMap = {
          1: { text: "Active", color: "green" },
          0: { text: "Inactive", color: "red" },
        };
        const { text, color } = statusMap[status] || {
          text: "Unknown",
          color: "gray",
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },

    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleId",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        // return (
        //   <Space size="middle">
        //     <UpdateStoreManager record={record} />
        //     <DeleteStoreManager record={record} />{" "}
        //     Pass the record to the delete component
        //   </Space>a
        // );
      },
    },
  ];

  console.log("AccountEmployee: ", AccountEmployee);

  return (
    <>
      <Table columns={columns} dataSource={AccountEmployee } />
      
      {/* <div>
        {AccountEmployee.map(account => (
          <div>
            {account.fullName}
          </div>
        ))}
      </div> */}
    </>
  );
}

export default ListEmployee;