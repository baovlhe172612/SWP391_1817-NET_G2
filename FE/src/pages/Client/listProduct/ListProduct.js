import React, { useEffect, useState } from "react";
import Product from "../../../components/Client/Product/Product";
import { get } from "../../../helpers/API.helper";
import { useLocation } from "react-router-dom";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([1]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [conditionSort, setCondition] = useState(1);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const fetchProducts = async (page = 1, condition = 1, search = '') => {
    let url = `http://localhost:5264/api/ProductControlles/getProductByPage?page=${page}&condition=${condition}`;

    if (condition === 2 || condition === 3 || condition === 4) {
      url = `http://localhost:5264/api/ProductControlles/getProductByPageWithCondition?condition=${condition}&page=${page}`;
    }

    if (search) {
      url = `http://localhost:5264/api/ProductControlles/search?keyword=${search}`;
    }

    const data = await get(url);
    console.log("data in url: ", data)

    console.log("data.message: ", data.message)
    if (data.message === "No products found with the given keyword.") {
      setProducts([]); // Set products to an empty array
    } else {
      setProducts(data);
    }

    console.log("seacrh: ====",search)
    console.log("product sau khi set data: ",products)
    // Update total pages and total products for search queries
    if (search) {
      const totalPagesData = await get(`http://localhost:5264/api/ProductControlles/getCountPageProduct?keyword=${search}`);
      console.log("totalPagesData",totalPagesData)
      setTotalPages(totalPagesData);

      const totalProductData = await get(`http://localhost:5264/api/ProductControlles/getCountProduct?keyword=${search}`);
      console.log("totalProductData",totalProductData)
      setTotalProduct(totalProductData);
    } 
    else {
      const totalPagesData = await get("http://localhost:5264/api/ProductControlles/getCountPageProduct");
      console.log("totalPagesData",totalPagesData)
      setTotalPages(totalPagesData);

      const totalProductData = await get("http://localhost:5264/api/ProductControlles/getCountProduct");
      console.log("totalProductData",totalProductData)
      setTotalProduct(totalProductData);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, conditionSort, searchQuery);
  }, [currentPage, conditionSort, searchQuery]);

  const handleDataByPage = async (item) => {
    setCurrentPage(item);
    fetchProducts(item, conditionSort, searchQuery);
  };

  const handleSortCondition = (event) => {
    const selectedSortCondition = parseInt(event.target.value);
    setCurrentPage(1);
    setCondition(selectedSortCondition);
  };

  console.log("Product",products)
  console.log("Product",products.length)
  return (
    <div className="shop-area section-space-y-axis-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="product-topbar">
              <ul>
                <li className="page-count">
                  <span>4</span> Product Found of <span>{totalProduct}</span>
                </li>
                <li className="product-view-wrap">
                  <ul className="nav" role="tablist">
                    <li className="grid-view" role="presentation">
                      <a
                        className="active"
                        id="grid-view-tab"
                        data-bs-toggle="tab"
                        href="#grid-view"
                        role="tab"
                        aria-selected="true"
                      >
                        <i className="fa fa-th"></i>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="short">
                  <select className="nice-select" value={conditionSort} onChange={handleSortCondition}>
                    <option value="1">Sort by Default</option>
                    <option value="2">Sort by Name</option>
                    <option value="3">Sort by High Price</option>
                    <option value="4">Sort by Low Price</option>
                  </select>
                </li>
              </ul>
            </div>

            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="grid-view"
                role="tabpanel"
                aria-labelledby="grid-view-tab"
              >
                <div className="product-grid-view row g-y-20">
                  {products.length > 0 ? (
                    products.map(product => <Product key={product.productId} product={product} />)
                  ) : (
                    <p style={{textAlign: "center", color:"red"}}>No products found</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pagination-area">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  {totalPages.map((item, index) => (
                    <li key={index} className={`page-item ${item === currentPage ? 'active' : ''}`} onClick={() => handleDataByPage(item)} style={{ cursor: 'pointer' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
