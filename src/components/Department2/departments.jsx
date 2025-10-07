// "use client";
// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import CategoryCard from "./categoryCard/categoryCard";
// import "./style.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import CategoryContainer from "../categoryContainer/categoryContainer";

// const staticDepartments = [
//   { _id: 1, visi_name: "Bakery", image: "/assets/banners/1.jpg" },
//   { _id: 2, visi_name: "Butcher", image: "/assets/banners/2.jpg" },
//   { _id: 3, visi_name: "Seafood", image: "/assets/banners/3.jpg" },
//   { _id: 4, visi_name: "Produce", image: "/assets/banners/4.jpg" },
//   { _id: 5, visi_name: "Butcher", image: "/assets/banners/5.jpg" },
//   { _id: 6, visi_name: "Seafood", image: "/assets/banners/6.jpg" },
//   { _id: 7, visi_name: "Produce", image: "/assets/banners/7.jpg" },
// ];

// // ✅ Custom Arrow Components
// const NextArrow = ({ onClick }) => (
//   <div className="custom-arrow custom-next" onClick={onClick}>
//     &#10095; {/* Right arrow icon */}
//   </div>
// );

// const PrevArrow = ({ onClick }) => (
//   <div className="custom-arrow custom-prev" onClick={onClick}>
//     &#10094; {/* Left arrow icon */}
//   </div>
// );

// export default function Departments2({ departments }) {
//   const [slidesToShow, setSlidesToShow] = useState(10);

//   const updateSlidesToShow = () => {
//     const width = window.innerWidth;
//     if (width < 480) setSlidesToShow(1);
//     else if (width < 768) setSlidesToShow(10);
//     else if (width < 992) setSlidesToShow(10);
//     else if (width < 1200) setSlidesToShow(10);
//     else setSlidesToShow(5);
//   };

//   useEffect(() => {
//     updateSlidesToShow();
//     window.addEventListener("resize", updateSlidesToShow);
//     return () => window.removeEventListener("resize", updateSlidesToShow);
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//     arrows: departments?.length > slidesToShow,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       { breakpoint: 2000, settings: { slidesToShow: 8 } }, // ✅ 2000px tak 8 cards
//       { breakpoint: 1600, settings: { slidesToShow: 7 } }, // ✅ 1600px tak 7 cards
//       { breakpoint: 1200, settings: { slidesToShow: 6 } },
//       { breakpoint: 992, settings: { slidesToShow: 5 } },
//       { breakpoint: 768, settings: { slidesToShow: 4 } },
//       { breakpoint: 480, settings: { slidesToShow: 2 } },
//     ],
//   };

//   return (
//     <div className="categories_slider">
//       <Slider {...settings}>
//         {departments?.map((cat) => (
//           // <CategoryCard key={cat._id} id={cat._id} image={cat.image} />
//           <CategoryContainer key={cat._id} image={cat.image} name={cat.visi_name} />
//         ))}
//       </Slider>
//     </div>
//   );
// }

"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryContainer from "../categoryContainer/categoryContainer";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next" onClick={onClick}>
    &#10095;
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev" onClick={onClick}>
    &#10094;
  </div>
);

export default function Departments2({ departments, onClick }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false, // ✅ don't loop, keeps alignment left
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false, // ❌ slick ke apne arrows hata diye
    autoplay: false, // ✅ autoplay off (better for categories)
    responsive: [
      { breakpoint: 2000, settings: { slidesToShow: 6 } },
      { breakpoint: 1600, settings: { slidesToShow: 6 } },
      { breakpoint: 1200, settings: { slidesToShow: 6 } },
      { breakpoint: 992, settings: { slidesToShow: 6 } },
      { breakpoint: 768, settings: { slidesToShow: 6 } },
      { breakpoint: 480, settings: { slidesToShow: 6 } },
    ],
  };

  // ✅ Hide arrows if no need to scroll
  const showArrows = departments?.length > settings.slidesToShow;

  return (
    <div className="categories_slider_wrapper">
      {/* ✅ Prev Button outside */}
      {showArrows && (
        <PrevArrow onClick={() => sliderRef.current.slickPrev()} />
      )}

      <div className="categories_slider">
        <span className="heading">Shop from Seafood Shop</span>
        <Slider ref={sliderRef} {...settings}>
          {departments?.map((cat) => (
            <CategoryContainer
              key={cat._id}
              image={cat.image}
              name={cat.visi_name}
              onClick={() => onClick(cat._id)}
            />
          ))}
        </Slider>
      </div>

      {/* ✅ Next Button outside */}
      {showArrows && (
        <NextArrow onClick={() => sliderRef.current.slickNext()} />
      )}
    </div>
  );
}
