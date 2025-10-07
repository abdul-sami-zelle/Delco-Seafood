"use client";

import { useEffect, useState } from "react";
import Products from "../components/Products/Products";
import Departments from "../components/Departments/Departments";
import Header from "../components/Header/Header";
import MoreProducts from "../components/MoreProducts/MoreProducts";
import SaleProducts from "../components/SaleProducts/SaleProducts";
import HeroSection from "../components/HeroSection/HeroSection";
import SideCart from "../components/SideCart/SideCart";
import Footer from "../components/Footer/Footer";
import { getSalesProductData } from "../lib/api";
import DepartmentCard from "../components/DepartmentCard/DepartmentCard";
import HeroSection2 from "@/components/HeroSection2/HeroSection";
import Departments2 from "@/components/Department2/departments";
import FtBanner from "@/components/footerBanner/ftBanner";
import MainSlider from "@/components/mainSlider/mainSlider";

export default function Home() {
  const [saleBgColor, setSaleBgColor] = useState("");
  const [scrollToSection, setScrollToSection] = useState(null);
  const [scrollToSectionSale, setScrollToSectionSale] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getSalesProductData();
  //     if (data?.color) {
  //       setSaleBgColor(data.color);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Header onDeptClick={(deptName) => setScrollToSection(deptName)} onDiscountClick={(dis) => setScrollToSectionSale(dis)} />
      <div className={`main-layout`}>
        <div className="main-content">
          {/* <HeroSection2/> */}
          <MainSlider />
          <Products scrollToSection={scrollToSection} onClick={(deptName) => setScrollToSection(deptName)} />
          <div
            className="sale-product-container"
            style={{ backgroundColor: saleBgColor }}
          >
            <SaleProducts scrollToSection={scrollToSectionSale} />
          </div>
          <FtBanner />

          <Footer />
        </div>
        <SideCart />
      </div>
    </>
  );
}
