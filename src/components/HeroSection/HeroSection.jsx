import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section-main">
      <div className="hero-section-first-container">
        <h1>Quality Cuts You Can Count On</h1>
        <p>
          At Delco Farmers Market, our Master Butcher brings you premium cuts—from prime steaks to leg of lamb. Perfect for BBQs, cookouts, and special gatherings, all our meats are ethically sourced, raised on vegetarian diets, antibiotic-free, and hand-slaughtered (Halal-certified).
        </p>
        {/* <span>Order Online</span> */}
      </div>
      <div className="hero-section-second-container">
        <img src="/assets/Images/banner.jpg" alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
