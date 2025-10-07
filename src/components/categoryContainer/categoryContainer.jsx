import React from "react";
import "./style.css";

export default function CategoryContainer({name,image,onClick}) {
    return(
        <div className="category_container" onClick={onClick}>
            <img src={"https://api.delcofarmersmarket.com"+image} alt="" srcset="" />
            <h2>{name}</h2>
        </div>
    )
}