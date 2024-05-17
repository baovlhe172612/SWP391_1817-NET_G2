import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Cart from "../../pages/Client/Cart/Cart";
import { Outlet } from "react-router-dom";
import ProductDetail from "../../pages/Client/ProductDetail/ProductDetail";

function LayoutDefault() {
  return (
    <>
      <Header />

      <div>
        <Outlet />
      </div>

      <Footer />

    </>
  );
}

export default LayoutDefault;
