import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreAddOutlined,
  UserAddOutlined,
  TableOutlined,
  UserOutlined,
  RadarChartOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  MenuOutlined,
} from "@ant-design/icons";

function MenuSider() {
  const items = [
    {
      key: "DashBoard",
      icon: <DashboardOutlined />,
      label: "DashBoard",
      children: [
        {
          key: "DashBoard1",
          label: <Link to="/admin/dashboard">DashBoard All</Link>,
        },
      ],
    },
    {
      key: "Store",
      label: "Store",
      icon: <AppstoreAddOutlined />,
      children: [
        {
          key: "store/listStore",
          label: <Link to="/admin/store/">List Store</Link>,
        },
        {
          key: "store/create",
          label: <Link to="/admin/store/create">Create Store</Link>,
        },
      ],
    },
    {
      key: "manager store",
      label: "Store's Manager",
      icon: <UserAddOutlined />,
      children: [
        {
          key: "manager/listStore",
          label: <Link to="/admin/manager-store/">List Store's Manager</Link>,
        },
        {
          key: "manager/create",
          label: (
            <Link to="/admin/manager-store/create">Create Store's Manager</Link>
          ),
        },
      ],
    },
    {
      key: "manager table",
      label: "Table",
      icon: <TableOutlined />,
      children: [
        {
          key: "table/listStore",
          label: <Link to="/admin/table/">List Table</Link>,
        },
        {
          key: "table/create",
          label: <Link to="/admin/table/create">Create Table</Link>,
        },
      ],
    },
    {
      key: "manager employee",
      label: "Employee",
      icon: <UserOutlined />,
      children: [
        {
          key: "employee/employees",
          label: <Link to="/admin/employee/">List Employee</Link>,
        },
        {
          key: "employee/create",
          label: <Link to="/admin/employee/create">Create Employee</Link>,
        },
      ],
    },
    {
      key: "manager category",
      label: "Category",
      icon: <RadarChartOutlined />,
      children: [
        {
          key: "category/categories",
          label: <Link to="/admin/category/">List Category</Link>,
        },
        {
          key: "category/create",
          label: <Link to="/admin/category/create">Create Category</Link>,
        },
      ],
    },
    {
      key: "manager product",
      label: "Product",
      icon: <ProductOutlined />,
      children: [
        {
          key: "product/products",
          label: <Link to="/admin/product/">List Product</Link>,
        },
        {
          key: "product/create",
          label: <Link to="/admin/product/create">Create Product</Link>,
        },
      ],
    },
    {
      key: "feedback",
      label: "Feedback",
      icon: <MenuOutlined />,
      children: [
        {
          key: "feedback/listFeedbacks",
          label: <Link to="/admin/feedback/">List Feedback</Link>,
        },
      ],
    },
    {
      key: "manager orders",
      label: "Orders",
      icon: <ShoppingCartOutlined />,
      children: [
        {
          key: "orders/",
          label: <Link to="/admin/orders/">List orders</Link>,
        },
      ],
    },
    {
      key: "manager qrs",
      label: "List Qrs",
      icon: <ShoppingCartOutlined />,
      children: [
        {
          key: "listQr/",
          label: <Link to="/admin/listQr/">List QR</Link>,
        },
      ],
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        items={Array.isArray(items) ? items : []}
        defaultOpenKeys={
          ["DashBoard1"] // account.roleId == 1 ? ["table/listStore"] :
        }
        defaultSelectedKeys={["/"]}
      />
    </>
  );
}
export default MenuSider;
