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
import ListStore from "../pages/Admin/Store/ListStore";
import CreateStore from "../pages/Admin/Store/CreateStore";
import ListStoreManager from "../pages/Admin/ManagerStore/ListStoreManager";
import CreateStoreManager from "../pages/Admin/ManagerStore/CreateStoreManager";
import ListTable from "../pages/Admin/Table/ListTable";
import CreateTable from "../pages/Admin/Table/CreateTable";
import CreateCategory from "../pages/Admin/Category/CreateCategory";
import ListCategory from "../pages/Admin/Category/ListCategory";
import ListProductAdmin from "../pages/Admin/Product/ListProductAdmin";
import CreateProduct from "../pages/Admin/Product/CreateProduct";
import ListOrders from "../pages/Admin/Orders/ListOrders";
import CreateEmployee from "../pages/Admin/Employee/CreateEmployee";
import ListEmployee from "../pages/Admin/Employee/ListEmployee";
import OrderDetails from "../pages/Admin/Orders/OrdetDetails";
// import QRScanner from "../pages/Client/QRScanner/QRScanner";
import Blog from "../pages/Client/Blog/Blog";
import Login from "../components/Admin/Accounts/Login/Login";
import Register from "../components/Admin/Accounts/Register/Register";
import ListQr from "../pages/Admin/ListQrCode/ListQr";
import UpdateStore from "../pages/Admin/Store/UpdateStore";
import ListFeedBack from "../pages/Admin/Feedback/ListFeedBack";
import Logout from "../components/Admin/Accounts/Logout/Logout";
import ProtectedRole from "../components/Admin/ProtectedRole/ProtectedRole";
import NotFound from "../pages/Admin/404NotFound/NotFound";
import UpdateStoreManager from "../pages/Admin/ManagerStore/UpdateStoreManager";
import Profile from "../pages/Admin/User/Profile";
import SearchStore from "../pages/Admin/Store/SearchStore";

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
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "listproduct",
        element: <ListProduct />,
      },
      {
        path: "listproduct/:id",
        element: <ListProduct />,
      },
      {
        path: "productDetail",
        element: <ProductDetail />,
      },
    ],
  },
  {
    // path: "/admin",
    element: <LayoutDefaultAdmin />,
    children: [
      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/admin/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <PrivateRouter />,
        children: [
          {
            path: "/admin/logout",
            element: <Logout />,
          },
          {
            path: "/admin/profile",
            element: <Profile />,
          },
          // ROLE OF OWNER
          {
            element: <ProtectedRole roles={["Owner"]} />,
            children: [
              {
                path: "store",
                children: [
                  {
                    path: "",
                    element: <ListStore />,
                  },
                  {
                    path: "create",
                    element: <CreateStore />,
                  },
                  {
                    path: "edit/:id",
                    element: <UpdateStore />,
                  },
                  {
                    path: "search",
                    element: <SearchStore />,
                  },
                ],
              },
              {
                path: "manager-store",
                children: [
                  {
                    path: "",
                    element: <ListStoreManager />,
                  },
                  {
                    path: "create",
                    element: <CreateStoreManager />,
                  },
                  {
                    path: "edit/:id",
                    element: <UpdateStoreManager />,
                  },
                ],
              },
            ],
          },

          // ROLE OF MANAGE
          {
            element: <ProtectedRole roles={["Manager", "Owner"]} />,
            children: [
              {
                path: "/admin/dashboard",
                element: <Dashboard />,
              },
              {
                path: "table",
                children: [
                  {
                    path: "create",
                    element: <CreateTable />,
                  },
                ],
              },
              {
                path: "employee",
                children: [
                  {
                    path: "",
                    element: <ListEmployee />,
                  },
                  {
                    path: "create",
                    element: <CreateEmployee />,
                  },
                ],
              },
              {
                path: "category",
                children: [
                  {
                    path: "",
                    element: <ListCategory />,
                  },
                  {
                    path: "create",
                    element: <CreateCategory />,
                  },
                ],
              },
              {
                path: "product",
                children: [
                  {
                    path: "",
                    element: <ListProductAdmin />,
                  },
                  {
                    path: "create",
                    element: <CreateProduct />,
                  },
                ],
              },
              {
                path: "feedback",
                children: [
                  {
                    path: "",
                    element: <ListFeedBack />,
                  },
                ],
              },
              {
                path: "listQr",
                children: [
                  {
                    path: "",
                    element: <ListQr />,
                  },
                ],
              },
            ],
          },
          // ROLE OF EMPLOYEE
          {
            element: <ProtectedRole roles={["Manager", "Employee", "Owner"]} />,
            children: [
              {
                path: "/admin/dashboard",
                element: <Dashboard />,
              },
              {
                path: "table",
                children: [
                  {
                    path: "",
                    element: <ListTable />,
                  },
                ],
              },
              {
                path: "orders",
                children: [
                  {
                    path: "",
                    element: <ListOrders />,
                  },
                  {
                    path: "orderdetails",
                    element: <OrderDetails />,
                  },
                ],
              },
            ],
          },
          // END ROLE
          {
            path: "404err",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];

export default routes;
