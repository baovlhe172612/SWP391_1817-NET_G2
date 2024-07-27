import React, { useEffect, useState } from "react";
import Product from "../../../components/Client/Product/Product";
import { get } from "../../../helpers/API.helper";
import { setCookie } from "../../../helpers/Cookie.helper";
import { Col, Flex, Row } from "antd";
import MenuCategory from "../../../components/Client/Category/MenuCategory";
import { useLocation, useParams } from "react-router-dom";
import { API_CATEGORY, LIST_PRODUCT_SIZE } from "../../../helpers/APILinks";
import { Pagination } from "antd";
import Sort from "./Sort";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([1]);
  const [categories, setCategory] = useState([]);
  const [totalProduct, setTotalProduct] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [conditionSort, setCondition] = useState(null);
  const { tableId, storeId } = useParams();

  if (tableId || storeId) {
    setCookie("tableId", tableId, 1);
    setCookie("storeId", storeId, 1);
  }
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const searchQuery = searchParams.get('search');
  const searchByCategoryID = searchParams.get("categoryId");

  useEffect(() => {
    if (searchByCategoryID !== null && parseInt(searchByCategoryID) !== 0) {
      const fetchApi = async () => {
        const data = await get(`
          ${LIST_PRODUCT_SIZE}/getProductSizeByCategoryId?categoriesID=${searchByCategoryID}`);

        console.log("da ghi de tai day 29");
        setProducts(data);
      };

      fetchApi();
    }
  }, [searchByCategoryID]);

  //dùng de loa du lieu luc an vao menu
  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(
        `${LIST_PRODUCT_SIZE}/getProductSizeByPage?page=1`
      );
      const dataCate = await get(`${API_CATEGORY}`);

      setCategory(dataCate);
      //
      // console.log("da ghi de tai day 104");
      // console.log(data);
      setProducts(data);
    };

    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(`${LIST_PRODUCT_SIZE}/getCountPageProductSize`);
      //

      setTotalPages(data);
    };

    fetchApi();
  }, []);

  //dùng để đếm số lượng sản phẩm
  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(` ${LIST_PRODUCT_SIZE}/getCountProductSize`);
      //

      setTotalProduct(data);
    };

    fetchApi();
  });

  // Hàm xử lý thay đổi page và gửi yêu cầu API
  const handleDataByPage = async (item) => {
    setCurrentPage(item);

    try {
      const response = await fetch(
        `${LIST_PRODUCT_SIZE}/getProductSizeByPage?page=${item}`
      );
      if (!response.ok) {
        const errorText = await response.text(); // Lấy thông tin chi tiết về lỗi
        throw new Error(`Network response was not ok: " ${errorText}`);
      }
      const data = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
      //console.log("da ghi de tai day 152");
      setProducts(data);
    } catch (error) {
      console.error("Error updating size:", error);
    }
  };

  const handleSortCondition = async (event) => {
    console.log(event)
    const selectedSortCondition = parseInt(event);

    setCondition(selectedSortCondition);

    if (searchByCategoryID !== null && parseInt(searchByCategoryID) !== 0) {
      console.log("Inside if condition");
      try {
        const response = await fetch(`
          ${LIST_PRODUCT_SIZE}/getProductByCategoryIDAndCondition?categoriID=${searchByCategoryID}&condition=${selectedSortCondition}
        `);
        if (!response.ok) {
          const errorText = await response.text(); // Lấy thông tin chi tiết về lỗi
          console.error("Network response was not ok:", errorText);
        }
        const data = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
        console.log(data);
        console.log("da ghi de tai day 181");
        setProducts(data);
      } catch (error) {
        console.error("Error updating size:", error);
      }
    } else {
      console.log("Inside else condition");
      try {
        const response = await fetch(`
         ${LIST_PRODUCT_SIZE}/getProductWithCondition?condition=${selectedSortCondition}
        `);
        if (!response.ok) {
          const errorText = await response.text(); // Lấy thông tin chi tiết về lỗi
          console.error("Network response was not ok:", errorText);
        }
        const data = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
        console.log(data);
        console.log("da ghi de tai day 198");
        setProducts(data);
      } catch (error) {
        console.error("Error updating size:", error);
      }
    }
  };

  return (
    <>
      <div class="shop-area section-space-y-axis-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              {/* ========== UL =============== */}
              <div >
              <ul style={{display: 'flex', flexDirection: 'wrap', justifyContent: 'space-around', alignItems: "center"}}>
              <li>
                    <ul class="nav" role="tablist">
                      {/* MENU CATEGORY */}
                      <MenuCategory categories={categories} setProducts={setProducts} products={products}/>
                      {/* MENU CATEGORY */}
                    </ul>
                  </li>

                  <li>
                    <Sort conditionSort={conditionSort} handleSortCondition={handleSortCondition}/>
                  </li>
                </ul>
              </div>
              {/* ========== UL =============== */}

              {/* ================ TAB - CONTENT =================== */}
              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="grid-view"
                  role="tabpanel"
                  aria-labelledby="grid-view-tab"
                >
                  <Row class="product-grid-view row g-y-20">
                    {/* CATEGORY */}
                    {/* <!-- PRODUCT --> */}
                    {products.length > 0 &&
                      products.map((product) => {
                        return <Product product={product} />;
                      })}
                    {/* <!-- PRODUCT --> */}
                  </Row>
                </div>
              </div>
              {/* ================ TAB - CONTENT =================== */}

              {/* ================ PAGINATION =================== */}

              <div className="pagination-area" style={{ textAlign: "center" }}>
                {conditionSort == null && (
                  <Pagination
                    current={currentPage}
                    total={totalProduct}
                    pageSize={4}
                    onChange={handleDataByPage}
                    showSizeChanger={false}
                  />
                )}
              </div>
              <br />

              {/* ================ PAGINATION =================== */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProduct;