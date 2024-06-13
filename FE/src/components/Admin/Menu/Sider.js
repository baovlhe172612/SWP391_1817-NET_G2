import React from "react";
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
  QrcodeOutlined, // Updated icon for QR section
  ReadOutlined, // Updated icon for Blogs section
} from "@ant-design/icons";
import { getSessionItem } from "../../../helpers/Session.helper";
import { hasRole } from "../../../helpers/CheckRole";

const itemsSider = (account) => {
  const items = [
    hasRole(account.roleName, ["Manager", "Owner"]) && {
      key: "DashBoard",
      icon: <DashboardOutlined />,
      label: "DashBoard",
      children: [
        {
          key: "DashBoard1",
          label: <Link to="/admin/dashboard">DashBoard All</Link>,
        },
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Owner"]) && {
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
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Owner"]) && {
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
          label: <Link to="/admin/manager-store/create">Create Store's Manager</Link>,
        },
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Manager", "Employee"]) && {
      key: "manager table",
      label: "Table",
      icon: <TableOutlined />,
      children: [
        {
          key: "table/listStore",
          label: <Link to="/admin/table/">List Table</Link>,
        },
        hasRole(account.roleName, ["Manager", "Owner"]) && {
          key: "table/create",
          label: <Link to="/admin/table/create">Create Table</Link>,
        },
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Manager"]) && {
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
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Manager", "Ower"]) && {
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
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Manager", "Ower"]) && {
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
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Manager", "Ower"]) && {
      key: "feedback ",
      label: "Feedback",
      icon: <MenuOutlined />,
      children: [
        {
          key: "feedback/listFeedbacks",
          label: <Link to="/admin/feedback/">List Feedback</Link>,
        },
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Manager", "Ower", "Employee"]) && {
      key: "manager orders",
      label: "Orders",
      icon: <ShoppingCartOutlined />,
      children: [
        {
          key: "orders/",
          label: <Link to="/admin/orders/">List orders</Link>,
        },
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Manager", "Ower"]) && {
      key: "manager qrs",
      label: "List Qrs",
      icon: <QrcodeOutlined />,
      children: [
        {
          key: "listQr/",
          label: <Link to="/admin/listQr/">List QR</Link>,
        },
      ].filter(Boolean),
    },
    hasRole(account.roleName, ["Manager"]) && {
      key: "manager blogs",
      label: "Blogs",
      icon: <ReadOutlined />,
      children: [
        {
          key: "blogs/list",
          label: <Link to="/admin/blogs/">List Blogs</Link>,
        },
        {
          key: "blogs/confirming",
          label: <Link to="/admin/blogs/confirming">Confirming</Link>,
        },
      ].filter(Boolean),
    },
  ].filter(Boolean);

  return items;
};

export default itemsSider;
