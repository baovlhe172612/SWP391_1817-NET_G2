import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Cart from "../../pages/Client/Cart/Cart";
import { Outlet, useLocation } from "react-router-dom";
import ProductDetail from "../../pages/Client/ProductDetail/ProductDetail";

function LayoutDefault() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tableId = searchParams.get('tableId');
  return (
    <>
      <Header tableId={tableId} />

      <div>
        <Outlet />
      </div>

      <Footer />

    </>
  );
}

export default LayoutDefault;
