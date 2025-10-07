"use client";
import React, { useState, useEffect,useContext } from "react";
import "./HeroSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CartContext } from "@/context/addToCart";

const HeroSection2 = () => {
  const slides = [
    {
      heading: "Fresh Halal Meat Daily",
      desc1: "At Delco Farmers Market, our Master Butcher brings you premium cuts—from prime steaks to leg of lamb. Perfect for BBQs, cookouts, and special gatherings, all our meats are ethically sourced, raised on vegetarian diets, antibiotic-free, and hand-slaughtered (Halal-certified).",
      desc2: "Sourced locally with 100% halal guarantee.",
      image: "/assets/Images/0.jpg",
      btnTxt: "Explore"
    },
    {
      heading: "Premium Quality Cuts",
      desc1: "At Delco Farmers Market, our Master Butcher brings you premium cuts—from prime steaks to leg of lamb. Perfect for BBQs, cookouts, and special gatherings, all our meats are ethically sourced, raised on vegetarian diets, antibiotic-free, and hand-slaughtered (Halal-certified).",
      desc2: "Perfect for BBQ, curries, or roasts.",
      image: "/assets/Images/1.jpg",
      btnTxt: "Explore"
    },
  ];

  const { cart } = useContext(CartContext);

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [fade, setFade] = useState(true);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  // Auto play every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };
  const prevSlide = () => {
    setIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (index === extendedSlides.length - 1) {
      // Jump to first real slide instantly
      setTransition(false);
      setIndex(1);
    } else if (index === 0) {
      // Jump to last real slide instantly
      setTransition(false);
      setIndex(slides.length);
    }
  };





  useEffect(() => {
    if (!transition) {
      // Wait for the index to update, then restore transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransition(true));
      });
    }
  }, [transition]);



  const realIndex = index === 0
    ? slides.length - 1
    : index === extendedSlides.length - 1
      ? 0
      : index - 1;

  const currentSlide = slides[realIndex]; // always safe



  useEffect(() => {
    if (!currentSlide) return;
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 2000); // faster fade
    return () => clearTimeout(timeout);
  }, [currentSlide]);



  return (
    <div className={cart?.length>0 ? "slider-container reserved" : "slider-container"}>
      {/* Right side content with fade */}
      <div className={cart?.length>0 ? "slider-right reserved" : "slider-right"}>
        {currentSlide ? (
          <div className="slider-right-inner">
            <h2 className={cart?.length>0 ? "reserved" : ""}>{currentSlide.heading}</h2>
            {currentSlide.desc1 && (
              <p className={cart?.length>0 ? "reserved" : ""}>{currentSlide.desc1}</p>
            )}
            {currentSlide.desc2 && (
              <p className={cart?.length>0 ? "reserved" : ""}>{currentSlide.desc2}</p>
            )}
            <button>{currentSlide.btnTxt}</button>
          </div>
        ) : null}
      </div>


      {/* Left side image slider */}
      <div className="slider-left">
        <div className="slider">
          <div
            className="slides"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: transition ? "transform 0.5s ease-in-out" : "none",
              display: "flex",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((src, i) => (
              <img
                key={i}
                src={src.image}
                alt={`slide-${i}`}
                style={{ width: "100%", flexShrink: 0 }}
              />
            ))}
          </div>

          <button className="arrow left" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="arrow right" onClick={nextSlide}>
            <FaChevronRight />
          </button>

          <div className="dots">
            {slides.map((_, i) => (
              <span
                key={i}
                // for dots
                className={`dot ${realIndex === i ? "active" : ""}`}

                onClick={() => {
                  setTransition(true);
                  setIndex(i + 1);
                }}

              ></span>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection2;
