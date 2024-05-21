import {
  DashboardOutlined,
  AppstoreAddOutlined,
  UserAddOutlined,
  TableOutlined,
  UserOutlined,
  RadarChartOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function MenuSider() {
  const items = [
    {
      key: "DashBoard",
      icon: <DashboardOutlined />,
      label: "DashBoard",
      children: [
        {
          key: "DashBoard1",
          label: <Link to="/admin/">DashBoard All</Link>,
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
          label: <Link to="store/">List Store</Link>,
        },
        {
          key: "store/create",
          label: <Link to="store/create">Create Store</Link>,
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
          label: <Link to="manager-store/">List Store's Manager</Link>,
        },
        {
          key: "manager/create",
          label: <Link to="manager-store/create">Create Store's Manager</Link>,
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
          label: <Link to="table/">List Table</Link>,
        },
        {
          key: "table/create",
          label: <Link to="table/create">Create Table</Link>,
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
          label: <Link to="employee/">List Employee</Link>,
        },
        {
          key: "employee/create",
          label: <Link to="employee/create">Create Employee</Link>,
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
          label: <Link to="category/">List Category</Link>,
        },
        {
          key: "category/create",
          label: <Link to="category/create">Create Category</Link>,
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
          label: <Link to="product/">List Product</Link>,
        },
        {
          key: "product/create",
          label: <Link to="product/create">Create Product</Link>,
        },
      ],
    },
    {
      key: "manager toping",
      label: "Toping",
      icon: <HeatMapOutlined />,
      children: [
        {
          key: "toping/",
          label: <Link to="topping/">List Toping</Link>,
        },
        {
          key: "toping/create",
          label: <Link to="topping/create">Create Toping</Link>,
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
          label: <Link to="orders/">List orders</Link>,
        },
      ],
    },
  ];
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultOpenKeys={["DashBoard1"]}
        defaultSelectedKeys={["/"]}
      />
    </>
  );
}
export default MenuSider;
