"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import "./SaleProducts.css";
import {
  getSalesProductData,
  BASE_URL,
  getSimilarProducts,
} from "../../lib/api";
import { CartContext } from "../../context/addToCart";
import ProductDetailModal from "../ProductDetailModal/ProductDetailModal";
import ProductCard from "../ProductCard/ProductCard";

const SaleProducts = ({ scrollToSection }) => {
  const [container, setContainer] = useState(null);
  const [sections, setSections] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loadingItems, setLoadingItems] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    async function fetchData() {
      const res = await getSalesProductData();
      if (res) {
        console.log(res, "here is res")
        setContainer(res);
        setSections(res.sales);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionRefs = useRef({});

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



  const scrollRefs = useRef({});

  const scroll = (id, direction) => {
    const scrollRef = scrollRefs.current[id];
    if (scrollRef) {
      const { scrollLeft, clientWidth } = scrollRef;
      const scrollAmount = clientWidth - 100;
      scrollRef.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!mounted) return null;


  return (
    <div
      className="sales-products-container"
      // style={{
      //   backgroundColor: container?.bgColor
      //     ? container.bgColor.startsWith("#")
      //       ? container.bgColor
      //       : `#${container.bgColor}`
      //     : "transparent",
      // }}
    >
      {sections?.map((section, index) => {
        const sectionImage = section?.image
          ? `${BASE_URL}${section.image}`
          : null;
        const products = section?.products
          ? section.products.map((p) => ({
            ...p,
            image: p.image,
          }))
          : [];

        return (
          <div key={section?._id} ref={(el) => (sectionRefs.current[section?.sec_name] = el)} className="sales-section">
            {index === 0 && (
              <div className="sales-top-banner">
                <img src="/assets/Images/savings.png" alt="Savings" />
              </div>
            )}

            <div
              className={`sales-container-wrapper ${sectionImage ? "with-image" : "full-width"
                }`}
            >


              <div className="sales-container">
                <div className="sales-header">
                  <span>{section?.sec_name}</span>
                  <p>
                    See more <FaChevronRight  size={12} />
                  </p>
                </div>

                <span className="horizontal-line"></span>


                <div className="sale_page_sale_carousel">
                  {sectionImage && (
                    <div className="sales-left-img">
                      <img
                        src={sectionImage}
                        alt={section?.sec_name || "section banner"}
                      />
                    </div>
                  )}


                  <div className={sectionImage ? "sales-department-image-craousel partial" : "sales-department-image-craousel full"}>
                    <div className="sales-carousel-wrapper">
                      <button
                        className="sales-arrow-btn left"
                        onClick={() => scroll(section?._id, "left")}
                      >
                        <FaChevronLeft />
                      </button>
                      <div
                        className="sales_card_container"
                        ref={(el) => (scrollRefs.current[section?._id] = el)}
                      >
                        {products.map((item) => {
                          const [intPart, decPart] = Number(item.price)
                            .toFixed(2)
                            .split(".");

                          const cartItem = getCartItem(item._id);

                          return (

                            <div key={item?._id}>
                              <ProductCard product={item} allProducts={section?.products} />
                            </div>
                          );
                        })}
                      </div>

                      <button
                        className="sales-arrow-btn right"
                        onClick={() => scroll(section?._id, "right")}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

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
  );
};

export default SaleProducts;
