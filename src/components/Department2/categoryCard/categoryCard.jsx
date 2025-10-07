import React from "react";
import "./style.css";

export default function CategoryCard({ id, image }) {
  return (
    <div className="category_card" key={id}>
      <img src={image} alt={`category-${id}`} />
    </div>
  );
}
