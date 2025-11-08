import React, { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { Link, useLocation, useHistory } from "react-router-dom";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const db = getFirestore(firebase);
  const location = useLocation();
  const history = useHistory();

  const searchResults = location.state?.results || null;
  const searchTerm = location.state?.searchTerm || null;

  // 🧭 Quick Menu Categories
  const categories = [
    { name: "mobile", icon: "📱" },
    { name: "car", icon: "🚗" },
    { name: "bike", icon: "🏍️" },
    { name: "electronics", icon: "💻" },
    { name: "furniture", icon: "🛋️" },
    { name: "fashion", icon: "👗" },
    { name: "books", icon: "📚" },
    { name: "real estate", icon: "🏠" },
  ];

  // 🔍 Category Filter — fetch from Firestore and go to /search
  const handleCategoryClick = async (categoryName) => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("category", "==", categoryName));
      const snapshot = await getDocs(q);

      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      history.push({
        pathname: "/search",
        state: { results, searchTerm: categoryName },
      });
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  // 🧠 Load Data
  useEffect(() => {
    if (searchResults) {
      console.log("Showing search results for:", searchTerm);
      setProducts(searchResults);
      return;
    }

    const stored = JSON.parse(localStorage.getItem("items")) || [];
    console.log("Local items:", stored);
    setProducts(stored);

    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const allPosts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts((prev) => {
          const all = [...prev, ...allPosts];
          const unique = all.filter((item, index, self) => {
            return (
              index ===
              self.findIndex(
                (p) =>
                  p.name?.trim().toLowerCase() ===
                    item.name?.trim().toLowerCase() &&
                  p.price?.toString().trim() ===
                    item.price?.toString().trim() &&
                  p.category?.trim().toLowerCase() ===
                    item.category?.trim().toLowerCase() &&
                  (p.image === item.image ||
                    (p.image?.slice(0, 50) === item.image?.slice(0, 50)))
              )
            );
          });
          return unique.reverse();
        });
      } catch (error) {
        console.error("Error getting products:", error);
      }
    };

    fetchProducts();
  }, [firebase, searchResults, searchTerm]);

  return (
    <div className="postParentDiv">
      {/* 🧭 Quick Menu */}
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>Categories</span>
        </div>

        <div className="cards quickMenu">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="card quickMenuCard"
              onClick={() => handleCategoryClick(cat.name)}
              style={{
                cursor: "pointer",
                textAlign: "center",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                background: "#fff",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: "30px" }}>{cat.icon}</div>
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🛒 Product List */}
      <div className="recommendations">
        <div className="heading">
          <span>{searchResults ? `Results for "${searchTerm}"` : "Fresh Recommendations"}</span>
        </div>

        <div className="cards">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card" key={product.id || index}>
                  <div className="favorite">
                    <Heart />
                  </div>

                  <div className="image">
                    {product.image ? (
                      <img
                        src={
                          product.image.startsWith("data:image")
                            ? product.image
                            : product.image.startsWith("http")
                            ? product.image
                            : `/Images/${product.image}`
                        }
                        alt={product.name}
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>

                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              {searchResults
                ? "No products found for this category."
                : "No products available."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
