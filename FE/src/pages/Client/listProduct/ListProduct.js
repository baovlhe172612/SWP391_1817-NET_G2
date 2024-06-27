
import React, { useEffect, useState } from "react";
import Product from "../../../components/Client/Product/Product";
import { get } from "../../../helpers/API.helper";
import { setCookie } from '../../../helpers/Cookie.helper';
import { Col, Row } from "antd";
import MenuCategory from "../../../components/Client/Category/MenuCategory";
import { useLocation, useParams } from "react-router-dom";
import { API_CATEGORY, LIST_PRODUCT_SIZE } from "../../../helpers/APILinks";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([1]);
  const [categories, setCategory] = useState([]);
  const [totalProduct, setTotalProduct] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [conditionSort, setCondition] = useState(null);
  const { tableId, storeId } = useParams();

  if(tableId || storeId) {
    setCookie('tableId', tableId, 1);
    setCookie('storeId', storeId, 1);
  }
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const searchQuery = searchParams.get('search');
  const searchByCategoryID = searchParams.get('categoryId');

  useEffect(() => {
    if (searchByCategoryID !== null && parseInt(searchByCategoryID) !== 0) {
      const fetchApi = async () => {
        const data = await get(`
          ${LIST_PRODUCT_SIZE}/getProductSizeByCategoryId?categoriesID=${searchByCategoryID}`
        );
  
        console.log("da ghi de tai day 29");
        setProducts(data);
      };
  
      fetchApi();
    }
  }, [searchByCategoryID ]); 

  




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
  
  // useEffect(() => {
  //   if (searchQuery !== null && parseInt(searchQuery) !== 0) {
  //     const fetchApi = async () => {
  //       const data = await get(
  //         http://localhost:5264/api/ProductControlles/search?search=${searchQuery}
  //       );
  
  //       console.log("da ghi de tai day 117");
  //       console.log(data);
  //       setProducts(data);
  //     };
  
  //     fetchApi();
  //   }
  // }, []); 


  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(
        `${LIST_PRODUCT_SIZE}/getCountPageProductSize`
      );
      //

      setTotalPages(data);
    };

    fetchApi();
  }, []);
  

  //dùng để đếm số lượng sản phẩm
  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(
       ` ${LIST_PRODUCT_SIZE}/getCountProductSize`
      );
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
    const selectedSortCondition = parseInt(event.target.value);
  
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

  //console.log(conditionSort);

  return (
    <>
   
      <div class="shop-area section-space-y-axis-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              {/* ========== UL =============== */}
              <div class="product-topbar">
                <ul>
                  <li class="page-count">
                    <span>4</span> Product Found of <span>{totalProduct}</span>
                  </li>
                  <li class="short">
                    <ul class="nav" role="tablist">
                      {/* MENU CATEGORY */}
                      <MenuCategory categories={categories}/>
                      {/* MENU CATEGORY */}
                    </ul>
                  </li>

                  <li class="short">
                    <select
                      className="nice-select"
                      value={conditionSort}
                      onChange={handleSortCondition}
                    >
                      <option value="1" selected={1}>
                        Sort by Default
                      </option>
                      <option value="2" selected={2}>
                        Sort by Name
                      </option>
                      <option value="3" selected={3}>
                        Sort by High Price
                      </option>
                      <option value="4" selected={4}>
                        Sort by Low Price
                      </option>
                    </select>

               
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
              {/* <div class="pagination-area">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">

                     

                    {conditionSort == null && totalPages.map((item, index) => (
                      //<li key={index}>{item.tenTruong}</li> // Thay "tenTruong" bằng trường dữ liệu thực tế từ API
                      
                      <li class="page-item active" key={index}>
                        <li
                          class={`page-item ${
                            item === currentPage ? "active" : ""
                          }`}
                          onClick={() => {
                            handleDataByPage(item);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {item}
                        </li>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div> */}
               <div
      className="pagination-area"
      style={{
        margin: "20px 0",
      }}
    >
      <nav aria-label="Page navigation example">
        <ul
          className="pagination justify-content-center"
          style={{
            display: "flex",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {conditionSort == null &&
            totalPages.map((item, index) => (
              <li
                className={`page-item ${item === currentPage ? "active" : ""}`}
                key={index}
                style={{
                  margin: "0 5px",
                }}
              >
                <a
                  onClick={() => {
                    handleDataByPage(item);
                  }}
                  style={{
                    display: "block",
                    padding: "10px 15px",
                    color: item === currentPage ? "white" : "#007bff",
                    backgroundColor: item === currentPage ? "#007bff" : "transparent",
                    textDecoration: "none",
                    border: "1px solid #dee2e6",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s, border-color 0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = item === currentPage ? "#0056b3" : "#007bff";
                    e.target.style.color = "white";
                    e.target.style.borderColor = "#007bff";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = item === currentPage ? "#007bff" : "transparent";
                    e.target.style.color = item === currentPage ? "white" : "#007bff";
                    e.target.style.borderColor = "#dee2e6";
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
              {/* ================ PAGINATION =================== */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProduct;