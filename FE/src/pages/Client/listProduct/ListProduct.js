import React, { useEffect, useState } from "react";
import Product from "../../../components/Client/Product/Product"
import { get } from "../../../helpers/API.helper";

function ListProduct() {

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([1]);
  const [totalProduct, setTotalProduct] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [conditionSort, setCondition] = useState(1);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get("http://localhost:5264/api/ProductControlles/getProductByPage?page=1");
      //

      setProducts(data);
    };



    fetchApi();
  }, []); 
  
  useEffect(() => {
    const fetchApi = async () => {
      const data = await get("http://localhost:5264/api/ProductControlles/getCountPageProduct");
      //

      
      setTotalPages(data);
    };



    fetchApi();
  }, []); 

  useEffect(() => {
    const fetchApi = async () => {
     
      const data = await get("http://localhost:5264/api/ProductControlles/getCountProduct");
      //

      setTotalProduct(data);
    };



    fetchApi();
  }); 
  



  
  // Hàm xử lý thay đổi size và gửi yêu cầu API
  const handleDataByPage = async (item) => {
    // const page = parseInt(e.target.value);
    setCurrentPage(item);

    try {
      const response = await fetch(`http://localhost:5264/api/ProductControlles/getProductByPage?page=${item}`);
      if (!response.ok) {
        const errorText = await response.text(); // Lấy thông tin chi tiết về lỗi
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      const data = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
     
      setProducts(data);
    } catch (error) {
      console.error('Error updating size:', error);
    }
  };

  const handleSortCondition = async (event) => {
    //page is CurrentPage
    const selectedSortCondition = parseInt(event.target.value);


    setCondition(selectedSortCondition);

    try {
      const response = await fetch(`http://localhost:5264/api/ProductControlles/getProductByPageWithCondition?page=${currentPage}&condition=${selectedSortCondition}`);
      if (!response.ok) {
        const errorText = await response.text(); // Lấy thông tin chi tiết về lỗi
       
      }
      const data = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error updating size:', error);
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
                  <li class="product-view-wrap">
                    <ul class="nav" role="tablist">
                      <li class="grid-view" role="presentation">
                        <a
                          class="active"
                          id="grid-view-tab"
                          data-bs-toggle="tab"
                          href="#grid-view"
                          role="tab"
                          aria-selected="true"
                        >
                          <i class="fa fa-th"></i>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="short">
                    <select className="nice-select" value={conditionSort} onChange={handleSortCondition}>
                      <option value="1" selected={1}>Sort by Default</option>
                      <option value="2" selected={2}>Sort by Name</option>
                      <option value="3" selected={3}>Sort by High Price</option>
                      <option value="4" selected={4}>Sort by Low Price</option>
                    </select>

                    {/* <select
                          className="nice-select wide rounded-0"
                          value={productSize.sizeId}
                          onChange={handleSizeChange}
                        >
                          <option value="1" selected={productSize.sizeId === 1}>X</option>
                          <option value="2" selected={productSize.sizeId === 2}>L</option>
                          <option value="3" selected={productSize.sizeId === 3}>M</option>
                    </select> */}

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
                  <div class="product-grid-view row g-y-20">
                    {/* <!-- PRODUCT --> */}
                    {products.length > 0 && products.map(product => {
                      return (
                        <Product product={product}/>
                      )
                      })}
                      {/* <!-- PRODUCT --> */}
                  </div>
                </div>
              </div>
              {/* ================ TAB - CONTENT =================== */}
                                  
              {/* ================ PAGINATION =================== */}
              <div class="pagination-area">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">


                  {totalPages.map((item, index) => (
                       //<li key={index}>{item.tenTruong}</li> // Thay "tenTruong" bằng trường dữ liệu thực tế từ API
                       <li class="page-item active">
                       <li class={`page-item ${item === currentPage ? 'active' : ''}`}  onClick={() => {handleDataByPage(item)}} style={{ cursor: 'pointer' }}>
                          {item}
                       </li>
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