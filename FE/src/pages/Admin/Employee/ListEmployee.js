// import React, { useEffect, useState } from "react";
// import { Button, Space, Table, Tag, message, Input } from "antd";
// import { LIST_Employee } from "../../../helpers/APILinks";
// import { get } from "../../../helpers/API.helper";
// import { Link } from "react-router-dom";
// import UpdateIsDelete from "./UpdateIsDelete";
// import updateStatus from "./UpdateStatus";

// const { Search } = Input;

// function ListEmployee() {
//   const [accountEmployee, setAccountEmployee] = useState([]);
//   const [filterStatus, setFilterStatus] = useState([]); // State to store selected filters
//   const [searchTerm, setSearchTerm] = useState(""); // State to store search term

//   const fetchApi = async () => {
//     try {
//       const data = await get(LIST_Employee);
//       console.log("accountEmployee", accountEmployee)
//       setAccountEmployee(data);
//     } catch (error) {
//       message.error("Error fetching accounts");
//       setAccountEmployee([]);
//     }
//   };

//   useEffect(() => {
//     fetchApi();
//   }, []);

//   const onReload = () => {
//     fetchApi();
//   };

//   const handleFilterChange = (status) => {
//     console.log("status: ", status)

//     //  prevStatus.includes(status) kiểm tra xem trạng thái hiện tại có bao gồm status hay không.
//     // Nếu có, hàm sẽ trả về một mảng trống [] để loại bỏ bộ lọc.
//     // Nếu không, hàm sẽ trả về một mảng chứa trạng thái được chọn [status].
//     setFilterStatus((prevStatus) =>
//       prevStatus.includes(status) ? [] : [status]

//     );
//     console.log("filterStatus after", filterStatus)
//   };

//   const getFilteredData = () => {

//     // Khởi tạo biến filteredData và gán nó với toàn bộ danh sách nhân viên 
//     let filteredData = accountEmployee;

//     console.log("filterStatus.length", filterStatus.length)
//     // Apply status filter
//     if (filterStatus.length > 0) {

//       const statusMap = {
//         active: 1,
//         inactive: 0,
//       };

//       filteredData = filteredData.filter(

//         (employee) => employee.status === statusMap[filterStatus[0]]
//       );
//       // console.log("filterStatus[0]",filterStatus[0]),
//       console.log("filteredData", filteredData)
//       console.log("----------------------------------------------------------",)
//     }

//     // Apply search filter
//     if (searchTerm) {
//       filteredData = filteredData.filter((employee) =>
//         Object.keys(employee).some((key) =>
//           String(employee[key]).toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }

//     return filteredData;
//   };

//   const columns = [
//     {
//       title: "AccountID",
//       dataIndex: "accountId",
//       key: "accountId",
//     },
//     {
//       title: "Full Name",
//       dataIndex: "fullName",
//       key: "fullName",
//     },
//     {
//       title: "Role Name",
//       dataIndex: "roleName",
//       key: "roleId",
//     },
//     {
//       title: "Store Name",
//       dataIndex: "storeName",
//       key: "storeName",
//     },

//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status, record) => {
//         const statusMap = {
//           1: { text: "Active", color: "green" },
//           0: { text: "Inactive", color: "red" }
//         };

//         const { text, color } = statusMap[status] || {
//           text: "Unknown",
//           color: "gray"
//         };

//         // Check if the employee is deleted
//         if (record.isDelete === 1) {
//           return (
//             <Button>
//               <Tag color="gray">Deleted</Tag>
//             </Button>

//           );
//         }

//         return (
//           <Button onClick={() => updateStatus(record, onReload)} disabled={record.isDelete === 1}>
//             <Tag color={color}>{text}</Tag>
//           </Button>
//         );
//       }
//     },


//     {
//       title: "isDelete",
//       dataIndex: "isDelete",
//       key: "isDelete",
//       render: (isDelete) => {
//         const statusMap = {
//           0: { text: "Undeleted", color: "green" },
//           1: { text: "Deleted", color: "red" },
//         };
//         const { text, color } = statusMap[isDelete] || {
//           text: "Unknown",
//           color: "gray",
//         };
//         return <Tag color={color}>{text}</Tag>;
//       },
//     },


//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space size="middle">
//           <UpdateIsDelete record={record} onReload={onReload} />
//           <Link to={`/admin/employee/edit/${record.accountId}`}>
//             <Button type="primary">Edit</Button>
//           </Link>
//           <Link to={`/admin/employee/detail/${record.accountId}`}>
//             <Button type="primary">Detail</Button>
//           </Link>
//         </Space>
//       ),
//     },
//   ];
//   // useEffect(() => {
//   //   // Load Dialogflow Messenger script
//   //   const script = document.createElement("script");
//   //   script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
//   //   script.async = true;
//   //   document.body.appendChild(script);

//   //   return () => {
//   //     document.body.removeChild(script);
//   //   };
//   // }, []);

//   return (
//     <>
//       {/* <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
//       <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
//       <df-messenger
//         intent="WELCOME"
//         chat-title="AI-BYAN"
//         agent-id="0ab401ed-4696-442c-80cd-0d5e1b252b36"
//         language-code="en"
//       ></df-messenger> */}
//       <Space style={{ marginBottom: 16 }}>

//         <Button.Group>
//           <Button
//             type={filterStatus.includes("active") ? "primary" : ""}
//             onClick={() => handleFilterChange("active")}
//           >
//             Active
//           </Button>
//           <Button
//             type={filterStatus.includes("inactive") ? "primary" : ""}
//             onClick={() => handleFilterChange("inactive")}
//           >
//             Inactive
//           </Button>
//         </Button.Group>


//         <Search
//           placeholder="Search"
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ width: 200 }}
//         />
//       </Space>

//       <Table columns={columns} dataSource={getFilteredData()} />
//     </>
//   );
// }

// export default ListEmployee;

import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message, Input } from "antd";
import { LIST_Employee } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import { Link } from "react-router-dom";
import UpdateIsDelete from "./UpdateIsDelete";
import updateStatus from "./UpdateStatus";

const { Search } = Input;

function ListEmployee() {
  const [accountEmployee, setAccountEmployee] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]); // State to store selected status filters
  const [filterIsDelete, setFilterIsDelete] = useState([]); // State to store selected isDelete filters
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  const fetchApi = async () => {
    try {
      const data = await get(LIST_Employee);
      setAccountEmployee(data);
    } catch (error) {
      message.error("Error fetching accounts");
      setAccountEmployee([]);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const onReload = () => {
    fetchApi();
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "status") {
      setFilterStatus((prevStatus) =>
        prevStatus.includes(value) ? [] : [value]
      );
    } else if (filterType === "isDelete") {
      setFilterIsDelete((prevIsDelete) =>
        prevIsDelete.includes(value) ? [] : [value]
      );
    }
  };

  const getFilteredData = () => {
    let filteredData = accountEmployee;

    // Apply status filter
    if (filterStatus.length > 0) {
      const statusMap = {
        active: 1,
        inactive: 0,
      };
      filteredData = filteredData.filter(
        (employee) => employee.status === statusMap[filterStatus[0]]
      );
    }

    // Apply isDelete filter
    if (filterIsDelete.length > 0) {
      filteredData = filteredData.filter(
        (employee) => employee.isDelete === parseInt(filterIsDelete[0])
      );
    }

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((employee) =>
        Object.keys(employee).some((key) =>
          String(employee[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filteredData;
  };

  const columns = [
    {
      title: "AccountID",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleId",
    },
    {
      title: "Store Name",
      dataIndex: "storeName",
      key: "storeName",
    },
    {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => {
              const statusMap = {
                1: { text: "Active", color: "green" },
                0: { text: "Inactive", color: "red" }
              };
      
              const { text, color } = statusMap[status] || {
                text: "Unknown",
                color: "gray"
              };
      
              // Check if the employee is deleted
              if (record.isDelete === 1) {
                return (
                  <Button>
                    <Tag color="gray">Deleted</Tag>
                  </Button>
      
                );
              }
      
              return (
                <Button onClick={() => updateStatus(record, onReload)} disabled={record.isDelete === 1}>
                  <Tag color={color}>{text}</Tag>
                </Button>
              );
            }
          },
    {
      title: "isDelete",
      dataIndex: "isDelete",
      key: "isDelete",
      render: (isDelete) => {
        const statusMap = {
          0: { text: "Undeleted", color: "green" },
          1: { text: "Deleted", color: "red" },
        };
        const { text, color } = statusMap[isDelete] || {
          text: "Unknown",
          color: "gray",
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <UpdateIsDelete record={record} onReload={onReload} />
          <Link to={`/admin/employee/edit/${record.accountId}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Link to={`/admin/employee/detail/${record.accountId}`}>
            <Button type="primary">Detail</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button.Group>
          <Button
            type={filterStatus.includes("active") ? "primary" : ""}
            onClick={() => handleFilterChange("status", "active")}
          >
            Active
          </Button>
          <Button
            type={filterStatus.includes("inactive") ? "primary" : ""}
            onClick={() => handleFilterChange("status", "inactive")}
          >
            Inactive
          </Button>
          <Button
            type={filterIsDelete.includes("1") ? "primary" : ""}
            onClick={() => handleFilterChange("isDelete", "1")}
          >
            Deleted
          </Button>
          <Button
            type={filterIsDelete.includes("0") ? "primary" : ""}
            onClick={() => handleFilterChange("isDelete", "0")}
          >
            Undeleted
          </Button>
        </Button.Group>
        <Search
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>
      <Table columns={columns} dataSource={getFilteredData()} />
    </>
  );
}

export default ListEmployee;
