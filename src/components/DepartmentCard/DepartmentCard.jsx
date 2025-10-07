// "use client";
// import React, { useEffect, useState } from "react";
// import "./DepartmentCard.css";
// import { getDepartments, getLandingPageData } from "../../lib/api";

// const DepartmentCard = () => {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       const data = await getLandingPageData();
//       if (data && data.featured_categories) {
//         setDepartments(data.featured_categories);
//       }
//       setLoading(false);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="department-container">
//       {loading
//         ? Array.from({ length: 4 }).map((_, i) => (
//           <div key={i} className="shimmer-card">
//             <div className="shimmer-box"></div>
//             <div className="shimmer-text"></div>
//           </div>
//         ))
//         : departments.map((dept) => (
//           <div key={dept._id} className="department-card">
//             <img
//               src={`https://api.delcofarmersmarket.com${dept.image}`}
//               alt={dept.visi_name}
//               className="department-img"
//             />
//             <h3>{dept.visi_name}</h3>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default DepartmentCard;



"use client";
import React, { useEffect, useState } from "react";
import "./DepartmentCard.css";
// import { getLandingPageData } from "../../lib/api"; // ❌ abhi nahi chahiye

const DepartmentCard = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 static array of departments with images
  const staticDepartments = [
    { _id: 1, visi_name: "Bakery", image: "/assets/banners/1.jpg" },
    { _id: 2, visi_name: "Butcher", image: "/assets/banners/2.jpg" },
    { _id: 3, visi_name: "Seafood", image: "/assets/banners/3.jpg" },
    { _id: 4, visi_name: "Produce", image: "/assets/banners/4.jpg" },
        { _id: 5, visi_name: "Butcher", image: "/assets/banners/5.jpg" },
    { _id: 6, visi_name: "Seafood", image: "/assets/banners/6.jpg" },
    { _id: 7, visi_name: "Produce", image: "/assets/banners/7.jpg" },
  ];

  useEffect(() => {
    // Agar API use karni hai to yaha laa sakte ho
    // abhi ke liye static data set kar raha hoon
    setLoading(true);
    setTimeout(() => {
      setDepartments(staticDepartments);
      setLoading(false);
    }, 800); // thoda delay taake shimmer effect dikhe
  }, []);

  return (
    <div className="department-container">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shimmer-card">
              <div className="shimmer-box"></div>
              <div className="shimmer-text"></div>
            </div>
          ))
        : departments.map((dept) => (
            <div key={dept._id} className="department-card">
              <img
                src={dept.image}
                alt={dept.visi_name}
                className="department-img"
              />
              {/* <h3>{dept.visi_name}</h3> */}
            </div>
          ))}
    </div>
  );
};

export default DepartmentCard;
