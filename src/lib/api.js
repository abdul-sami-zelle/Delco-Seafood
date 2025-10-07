export const BASE_URL = "https://api.delcofarmersmarket.com";
// export const BASE_URL = "http://localhost:5010";


export async function getLandingPageData() {
  try {
    const res = await fetch(`${BASE_URL}/api/seafood-shop/landing-page/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch landing page data");

    const data = await res.json();
    return data.landingPage;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

export async function getProductData() {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/section/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch product data");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

export async function getSalesProductData() {
  try {
    const res = await fetch(`${BASE_URL}/api/seafood-shop/landing-page/get-sale`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch product data");

    const data = await res.json();
    return data?.salesPage;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}


export async function getCategories() {
  try {
    const res = await fetch(`https://api.delcofarmersmarket.com/api/v1/categories/get?department=68e4b4b5fcb83918d0c0705f`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch product data");

    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

export async function getSimilarProducts(category, excludeId, limit = 5) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/products/get-similar?category=${category}&exclude=${excludeId}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch similar products");

    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error("API Error (similar products):", err);
    return [];
  }
}

export async function getDepartments(parent = 1, sortOrder = "asc") {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/departments/get?parent=${parent}&sortOrder=${sortOrder}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch departments");
    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error("API Error (departments):", err);
    return [];
  }
}
