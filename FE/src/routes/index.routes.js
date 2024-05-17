import LayoutDefault from "../Layout/LayoutDefault/LayoutDefault";
import Home from "../pages/Client/Home/Home";
import About from "../pages/Client/About/About";
import Contact from "../pages/Client/Contact/Contact";
import Cart from "../pages/Client/Cart/Cart";
import ListProduct from "../pages/Client/listProduct/ListProduct";
import ProductDetail from "../pages/Client/ProductDetail/ProductDetail";
import LayoutDefaultAdmin from "../Layout/LayoutDefaultAdmin/LayoutDefaultAdmin";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import ListStore from '../pages/Admin/Store/ListStore'
import CreateStore from '../pages/Admin/Store/CreateStore'
import ListStoreManager from '../pages/Admin/ManagerStore/ListStoreManager'
import CreateStoreManager from '../pages/Admin/ManagerStore/CreateStoreManager'
import ListTable from '../pages/Admin/Table/ListTable'
import CreateTable from '../pages/Admin/Table/CreateTable'
import CreateCategory from "../pages/Admin/Category/CreateCategory";
import ListCategory from "../pages/Admin/Category/ListCategory";
import ListProductAdmin from "../pages/Admin/Product/ListProductAdmin";
import CreateProduct from "../pages/Admin/Product/CreateProduct";
import ListOrders from "../pages/Admin/Orders/ListOrders";
import CreateEmployee from "../pages/Admin/Employee/CreateEmployee";
import ListEmployee from "../pages/Admin/Employee/ListEmployee";
import CreateTopping from "../pages/Admin/Topping/CreateTopping";
import ListTopping from "../pages/Admin/Topping/ListTopping";

const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/listProduct",
        element: <ListProduct />,
      },
      {
        path: "/productDetail",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutDefaultAdmin />,
    children: [
      {
        element: <PrivateRouter />,
        children: [
          {
            path: "/admin/",
            element: <Dashboard />,
          },
          {
            path: "/admin/store",
            children: [
              {
                path: "/admin/store/",
                element: <ListStore />,
              },
              {
                path: "/admin/store/create",
                element: <CreateStore />,
              },
            ],
          },
          {
            path: "/admin/manager-store",
            children: [
              {
                path: "/admin/manager-store/",
                element: <ListStoreManager />,
              },
              {
                path: "/admin/manager-store/create",
                element: <CreateStoreManager />,
              },
            ],
          },
          {
            path: "/admin/table",
            children: [
              {
                path: "/admin/table/",
                element: <ListTable />,
              },
              {
                path: "/admin/table/create",
                element: <CreateTable />,
              },
            ],
          },
          {
            path: "/admin/employee",
            children: [
              {
                path: "/admin/employee/",
                element: <ListEmployee />,
              },
              {
                path: "/admin/employee/create",
                element: <CreateEmployee />,
              },
            ],
          },
          {
            path: "/admin/category",            
            children: [
              {
                path: "/admin/category/",
                element: <ListCategory />,
                
              },
              {
                path: "/admin/category/create",
                element: <CreateCategory />,
                
              },
            ],
          },
          {
            path: "/admin/product",
            children: [
              {
                path: "/admin/product/",
                element: <ListProductAdmin />,
              },
              {
                path: "/admin/product/create",
                element: <CreateProduct />,
              },
            ],
          },
          {
            path: "/admin/topping",
            children: [
              {
                path: "/admin/topping/",
                element: <ListTopping />,
              },
              {
                path: "/admin/topping/create",
                element: <CreateTopping />,
              },
            ],
          },
          {
            path: "/admin/orders",
            children: [
              {
                path: "/admin/orders/",
                element: <ListOrders />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
