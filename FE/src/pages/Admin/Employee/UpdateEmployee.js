// import { Button, Form, Input, Select, Switch, message } from "antd";
// import { useEffect, useState } from "react";
// import { get, patch, put } from "../../../helpers/API.helper";
// import { useParams, Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { alear_success } from "../../../helpers/Alert.helper";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { GET_ACCOUNT_BY_ID, GET_ALL_ACCOUNTS, LIST_ACCOUNT, LIST_STORES } from "../../../helpers/APILinks";
// const { Option } = Select;

// function UpdateEmployee() {
//   const account = useSelector(state => state.AccountReducer);
//   console.log("account",account)
//   const [accountemployee, setAccountemployee] = useState([]);
//   const [form] = Form.useForm();
//   const id = useParams().id;
//   const navigate = useNavigate()
//   useEffect(() => {
//     const fetchApi = async () => {
//       try {
//         const data = await get(`${LIST_ACCOUNT}/${id}`);
//         console.log("data", data);    
//         form.setFieldsValue({
//           accountId: data.accountId,
//           fullName: data.fullName,
//           userName: data.userName,
//           passWord: data.passWord,
//           status: data.status === 1,
//           email: data.email,
//           isDelete: data.isDelete,
//           storeId: data.storeId,
//           phone: data.phone,
//           address: data.address,
//           roleId: data.roleId,
//           cccd: data.cccd,
//         });
//         setAccountemployee(data);
//         console.log("accountemployee", accountemployee);
//       } catch (error) {
//         console.log("err in UpdateStore", error);
//         setAccountemployee([]);
//       }
//     };

//     fetchApi();
//   }, [form]);


//   const handleSubmit = async (values) => {
//     // sửa lại biến switch cho isDeleted
//     values.status = values.status ? 1 : 0;
//     values.roleId = 3
//     values.isDelete = 0;

//     console.log(values);
//     const data = await put(`${GET_ACCOUNT_BY_ID}/${id}`, values);
//     if (data) {
//       // thông báo ra màn hình
//       alear_success("Update!", "updated");
//       navigate(`/admin/employee/`)
//     }
//   };
//   // api store
//   const [Stores, setStores] = useState([]);
//   const [Accounts, setAccounts] = useState([]);
//   const fetchApi = async () => {
//     try {
//       const data = await get(LIST_STORES);  
//       console.log("data store",data)
//       const dataAccount = await get(GET_ALL_ACCOUNTS);  
//       setStores(data);
//       setAccounts(dataAccount);
//     } catch (error) {
//       message.error("Error fetching accounts");
//       console.log("Error in ListStoreManager", error);
//       setStores([]);
//       setAccounts([]);
//     }
//   };
//   useEffect(() => {
//     fetchApi();
//   }, []);

//   // lọc account hiện tại 
//   const filteredAccounts = Accounts.filter(account => account.accountId !== accountemployee.accountId);
//   console.log(filteredAccounts); 


//   return (
//     <>
//       <h2 >Edit Store's Employee</h2>
//       <Form
//         layout="horizontal"
//         labelCol={{ span: 3 }}
//         wrapperCol={{ span: 14 }}
//         name="create-employee"
//         onFinish={handleSubmit}
//         form={form}
//       >

//         <Form.Item label="Account ID" name="accountId">
//           <Input readOnly />
//         </Form.Item>

//         <Form.Item
//           label="Username"
//           name="userName"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your username!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="passWord"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your password!',
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item
//           label="Status"
//           name="status"
//           valuePropName="checked"
//           initialValue={true}
//         >
//           <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             {
//               type: 'email',
//               message: 'The input is not valid E-mail!',
//             },
//             {
//               required: true,
//               message: 'Please input your E-mail!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Full Name"
//           name="fullName"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your full name!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Address"
//           name="address"
//         >
//           <Input />
//         </Form.Item>


//         <Form.Item
//           label="CCCD"
//           name="cccd"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your cccd!',
//             },
//             {
//               pattern: /^0\d{0,11}$/,
//               message: 'Please input your number starting with 0 and ensure the length is less than or equal to 12 digits!',
//             },
//           ]}

//         >
//           <Input />
//         </Form.Item>


//         <Form.Item
//           label="Phone"
//           name="phone"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your phone number!',
//             },
//             {
//               pattern: /^0\d{0,9}$/,
//               message: 'Please input your number start =0 and ensure the length is <= 10 digits!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>


//         <Form.Item
//           label="Role"
//           name="roleId"
//           key="roleId"
//         >
//           <Select defaultValue={3} disabled>
//             <Select.Option value={3}>Employee</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="Store"
//           name="StoreId"
//           key="StoreId"
//           initialValue={account.storeId}
//         >
//           <Select>

//             <Select.Option value={account.storeId}>
//               {account.storeName}
//             </Select.Option>

//           </Select>
//         </Form.Item>
//         <Form.Item
//           label="isdelete"
//           name="isDelete"
//           hidden
//         >
//           <Input value={0} />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" >
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

// export default UpdateEmployee;


import { Button, Form, Input, Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { get, put } from "../../../helpers/API.helper";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GET_ACCOUNT_BY_ID, GET_ALL_ACCOUNTS, LIST_ACCOUNT, LIST_STORES } from "../../../helpers/APILinks";
import { alear_success } from "../../../helpers/Alert.helper";
const { Option } = Select;

function UpdateEmployee() {
  const account = useSelector(state => state.AccountReducer);
  const [accountemployee, setAccountemployee] = useState({});
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [Accounts, setAccounts] = useState([]);

  // Fetch account data for form population
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${LIST_ACCOUNT}/${id}`);
        form.setFieldsValue({
          accountId: data.accountId,
          fullName: data.fullName,
          userName: data.userName,
          passWord: data.passWord,
          status: data.status === 1,
          email: data.email,
          isDelete: data.isDelete,
          storeId: data.storeId,
          phone: data.phone,
          address: data.address,
          roleId: data.roleId,
          cccd: data.cccd,
        });
        setAccountemployee(data);
      } catch (error) {
        console.log("Error in UpdateEmployee", error);
        setAccountemployee({});
      }
    };

    fetchApi();
  }, [form, id]);

  // Fetch stores and accounts data for validation
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountsData = await  get(GET_ALL_ACCOUNTS);
     console.log("accountsData",accountsData)
        setAccounts(accountsData);
      } catch (error) {
        message.error("Error fetching stores and accounts");
        console.log("Error in fetching stores and accounts", error);
     
        setAccounts([]);
      }
    };
    fetchApi();
  }, []);

  const handleSubmit = async (values) => {
    values.status = values.status ? 1 : 0;
    values.roleId = 3;
    values.isDelete = 0;

    const data = await put(`${GET_ACCOUNT_BY_ID}/${id}`, values);
    console.log("accountsDataByID",data)
    if (data) {
      alear_success("Update!", "Updated successfully");
      navigate(`/admin/employee/`);
    }
  };

  // Custom validator to check uniqueness
  const checkUnique = (field, value) => {
    return !Accounts.some(account => account[field] === value && account.accountId !== accountemployee.accountId);
  };

  return (
    <>
      <h2>Edit Store's Employee</h2>
      <Form
        layout="horizontal"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
        name="update-employee"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item label="Account ID" name="accountId">
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            {
              validator: (_, value) =>
                value && !checkUnique('userName', value) ?
                  Promise.reject('Username already exists') :
                  Promise.resolve()
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="passWord"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
            {
              validator: (_, value) =>
                value && !checkUnique('email', value) ?
                  Promise.reject('Email already exists') :
                  Promise.resolve()
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Please input your full name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="CCCD"
          name="cccd"
          rules={[
            {
              required: true,
              message: 'Please input your CCCD!',
            },
            {
              pattern: /^0\d{0,11}$/,
              message: 'Please input your number starting with 0 and ensure the length is less than or equal to 12 digits!',
            },
            {
              validator: (_, value) =>
                value && !checkUnique('cccd', value) ?
                  Promise.reject('CCCD already exists') :
                  Promise.resolve()
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
            {
              pattern: /^0\d{0,9}$/,
              message: 'Please input your number starting with 0 and ensure the length is less than or equal to 10 digits!',
            },
            {
              validator: (_, value) =>
                value && !checkUnique('phone', value) ?
                  Promise.reject('Phone number already exists') :
                  Promise.resolve()
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="roleId"
          key="roleId"
        >
          <Select defaultValue={3} disabled>
            <Option value={3}>Employee</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Store"
          name="storeId"
          key="storeId"
          initialValue={account.storeId}
        >
          <Select>

            <Select.Option value={account.storeId}>
              {account.storeName}
            </Select.Option>

          </Select>
        </Form.Item>

        <Form.Item
          label="isDelete"
          name="isDelete"
          hidden
        >
          <Input value={0} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateEmployee;
