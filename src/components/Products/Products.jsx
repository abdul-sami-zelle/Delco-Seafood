"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./Products.css";
import {
  getLandingPageData,
  BASE_URL,
  getSimilarProducts,
} from "../../lib/api";
import { CartContext } from "../../context/addToCart";
import { IoAddOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import ProductDetailModal from "../ProductDetailModal/ProductDetailModal";
import ProductCard from "../ProductCard/ProductCard";
import Departments2 from "../Department2/departments";

const Products = ({ scrollToSection , onClick }) => {
  const [sections, setSections] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const scrollRefs = useRef({});

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setShowSideCart,
  } = useContext(CartContext);

  const getCartItem = (id) => cart.find((item) => item._id === id);

  const handleProductClick = async (product) => {
    setSelectedProduct(product);
    setShowModal(true);

    const data = await getSimilarProducts(product.category, product._id, 5);
    setSimilarProducts(data);
  };
  const sectionRefs = useRef({});

  useEffect(() => {
    async function fetchData() {
      const res = await getLandingPageData();
      if (res && res.sections) {
        setSections(res.sections);
        setDepartments(res.featured_categories);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const scroll = (sectionIndex, direction) => {
    const ref = scrollRefs.current[sectionIndex];
    if (ref) {
      const { scrollLeft, clientWidth } = ref;
      const scrollAmount = clientWidth - 100;
      ref.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (scrollToSection && sectionRefs.current[scrollToSection]) {
      const element = sectionRefs.current[scrollToSection];
      const headerHeight = 80; // <-- yahan apne header ki actual height px me set karo

      const offsetTop = element.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, [scrollToSection]);


  return (
    <div>
      {departments.length > 0 && <Departments2 departments={departments} onClick={onClick} />}
      <div className="main-bg">
        <div className="products-container">
          {loading
            ? [...Array(2)].map((_, secIndex) => (
              <div key={secIndex} className="section-block">
                <div className="products-header">
                  <span
                    className="shimmer shimmer-text"
                    style={{
                      width: "200px",
                      height: "28px",
                      marginLeft: "inherit",
                    }}
                  ></span>
                  <span
                    className="shimmer shimmer-text"
                    style={{
                      width: "80px",
                      height: "16px",
                      marginRight: "inherit",
                    }}
                  ></span>
                </div>
                <span className="horizontal-line"></span>

                <div className="carousel-wrapper">
                  <div className="product_card_container">
                    {[...Array(8)].map((_, i) => (
                      <div className="product-card" key={i}>
                        <div className="shimmer shimmer-img"></div>
                        <div
                          className="shimmer shimmer-text"
                          style={{
                            width: "100%",
                            height: "14px",
                            marginTop: "10px",
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
            : sections?.map((section, index) => (
              <div ref={(el) => (sectionRefs.current[section?.categories[0]._id] = el)} key={section?._id} className="section-block">
                <div className="products-header">
                  <span>{section.sec_name}</span>
                  <p>
                    See more <FaChevronRight  size={12} />
                  </p>
                </div>
                <span className="horizontal-line"></span>

                <div className="carousel-wrapper">
                  <button
                    className="arrow-btn left"
                    onClick={() => scroll(index, "left")}
                  >
                    <FaChevronLeft />
                  </button>

                  <div
                    className="product_card_container"
                    ref={(el) => (scrollRefs.current[index] = el)}
                  >
                    {section.products.map((product) => {
                      const item = getCartItem(product._id);
                      return (
                        <div key={product?._id}>
                          <ProductCard product={product} allProducts={section?.products} />

                        </div>
                      );
                    })}
                  </div>

                  <button
                    className="arrow-btn right"
                    onClick={() => scroll(index, "right")}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            ))}
          {showModal && selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={(newProduct) => {
                newProduct ? handleProductClick(newProduct) : setShowModal(false);
              }}
              allProducts={similarProducts}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Products;
