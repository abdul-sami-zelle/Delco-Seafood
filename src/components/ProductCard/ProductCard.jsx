"use client";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/addToCart";
import { useRouter } from "next/navigation";
import ProductDetailModal from "../ProductDetailModal/ProductDetailModal";
import { BASE_URL } from "../../lib/api";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import "./style.css";

export default function ProductCard({
  product,
  allProducts = [],
  handleShowDetailModal,
  disableModal = false,
}) {
  const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cart,
    setShowSideCart,
  } = useContext(CartContext);

  const router = useRouter();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const item = cart.find((itm) => itm._id === product._id);

  const handleImageClick = (e) => {
    e.stopPropagation();

    if (disableModal) {
      router.push(`/product/${product.slug}`);
      return;
    }

    if (isMobile) {
      router.push(`/product/${product.slug}`);
    } else {
      if (handleShowDetailModal) {
        handleShowDetailModal(product, allProducts);
      } else {
        setShowDetailModal(true);
      }
    }
  };

  const handleNameClick = (e) => {
    e.stopPropagation();
    router.push(`/product/${product.slug}`);
  };

  useEffect(() => {
    if (showDetailModal) {
      const filtered = allProducts
        .filter((itm) => itm._id !== product._id)
        .slice(0, 4);

      setFilteredProducts(filtered);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showDetailModal, allProducts, product._id]);

  return (
    <>
      <div className="product-card-container">
        <div className="product-card">
          <div className="product-card-inner">
            <img
              src={`${BASE_URL}${product?.image}`}
              alt={product.title}
              onClick={handleImageClick}
            />

            <div className="product-info">
              {!product.hidePrice && (
                <p className="price">
                  {product.currency}
                  {product.price.toFixed(2)}
                  {product.mode === "weight" && (
                    <span className="lb">
                      / {product.volume}
                      {product.volumeUnits}
                    </span>
                  )}
                </p>
              )}
              <h4 className="name" onClick={handleNameClick}>
                {product.title}
              </h4>
            </div>
          </div>

          {/* 🔥 Add to Cart button with qty control */}
          {!item ? (
            loadingProduct === product._id ? (
              <div className="loader"></div>
            ) : (
              <button
                className="add-to-cart"
                onClick={(e) => {
                  e.stopPropagation();
                  setLoadingProduct(product._id);
                  setTimeout(() => {
                    addToCart(
                      {
                        ...product,
                        _id: product._id,
                        image: `${BASE_URL}${product.image}`,
                      },
                      product.quantityInitial || 1
                    );
                    setShowSideCart(true);
                    setLoadingProduct(null);
                  }, 800);
                }}
              >
                Add to Cart
              </button>
            )
          ) : (
            <div className="add-to-cart others" id={`qty-${product._id}`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.quantity === product.quantityMin) {
                    const control = document.querySelector(`#qty-${product._id}`);
                    if (control) {
                      control.classList.add("collapse-anim");
                      setTimeout(() => {
                        removeFromCart(product._id);
                      }, 300);
                    }
                  } else {
                    decreaseQuantity(product._id);
                  }
                }}
              >
                {item.quantity === product.quantityMin ? (
                  <AiOutlineDelete />
                ) : (
                  <AiOutlineMinus />
                )}
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  increaseQuantity(product._id);
                }}
              >
                <MdAdd />
              </button>
            </div>
          )}

        </div>
      </div>

      {!disableModal && showDetailModal && (
        <ProductDetailModal
          showModal={showDetailModal}
          setShowModal={setShowDetailModal}
          productData={product}
          otherProducts={filteredProducts}
        />
      )}
    </>
  );
}
