import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../store/Context";
import "./View.css";

function View() {
  const { firebase } = useContext(FirebaseContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const db = getFirestore(firebase);

  useEffect(() => {
  const fetchProduct = async () => {
    console.log("🟢 useParams id =", id);

    const stored = JSON.parse(localStorage.getItem("items")) || [];
    console.log("📦 LocalStorage items:", stored);

    const localProduct = stored.find((item) => String(item.id) === String(id));
    console.log("📦 Found local product:", localProduct);

    if (localProduct) {
      setProduct(localProduct);
      return;
    }

    try {
      console.log("🔍 Checking Firestore for document:", id);
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("✅ Firestore product found:", docSnap.data());
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.warn("⚠️ No product found in Firestore for ID:", id);
      }
    } catch (error) {
      console.error("🔥 Firestore error:", error);
    }
  };

  fetchProduct();
}, [db, id]);


  if (!product)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

  return (
    <div className="product-detail">
      <div className="image-section">
        <img
          src={
            product.image?.startsWith("data:image")
              ? product.image
              : product.image?.startsWith("http")
              ? product.image
              : `/Images/${product.image}`
          }
          alt={product.name}
        />
      </div>
      <div className="info-section">
        <h2>{product.name}</h2>
        <h3>₹ {product.price}</h3>
        <h2>{product.name}</h2>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p> <strong>Description:</strong>{product.description && <p>{product.description}</p>} </p>
        <p>
          <strong>Location:</strong> {product.location}
        </p>

        <button
          onClick={() => window.history.back()}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#002f34",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default View;

