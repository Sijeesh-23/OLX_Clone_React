import React, { Fragment, useState, useContext, useEffect } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseContext, AuthContext } from "../../store/Context";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [items, setItems] = useState([]);

  const db = getFirestore(firebase);
  const auth = getAuth(firebase);

  // Load saved items from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    setItems(stored);
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      alert("Please fill in all required fields!");
      return;
    }

    if (!user) {
      alert("Please log in first!");
      return;
    }

    const id = Date.now();
    const newItem = {
      id,
      name,
      category,
      price,
      brand,
      description,
      location,
      image,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));

    try {
      await addDoc(collection(db, "products"), {
        name,
        category,
        price: Number(price),
        brand,
        description,
        location,
        image,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });

      alert("✅ Product uploaded successfully!");
      // Reset form
      setName("");
      setCategory("");
      setPrice("");
      setBrand("");
      setDescription("");
      setLocation("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Failed to upload product.");
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
              Post Your Ad
            </h2>

            {/* Product Name */}
            <label htmlFor="name">Product Name*</label>
            <input
              className="input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Category Dropdown */}
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select a Category --</option>
              <option value="mobile">📱 Mobiles</option>
              <option value="car">🚗 Cars</option>
              <option value="bike">🏍️ Bikes</option>
              <option value="electronics">💻 Electronics</option>
              <option value="furniture">🛋️ Furniture</option>
              <option value="fashion">👗 Fashion</option>
              <option value="books">📚 Books</option>
              <option value="real estate">🏠 Real Estate</option>
              <option value="appliances">🔌 Appliances</option>
              <option value="pets">🐶 Pets</option>
              <option value="sports">🏀 Sports</option>
              <option value="jobs">💼 Jobs</option>
              <option value="services">🧰 Services</option>
              <option value="other">🔹 Other</option>
            </select>

            {/* Price */}
            <label htmlFor="price">Price (₹)*</label>
            <input
              className="input"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            {/* Brand */}
            <label htmlFor="brand">Brand</label>
            <input
              className="input"
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Samsung, Honda, LG"
            />

            {/* Description */}
            <label htmlFor="description">Description</label>
            <textarea
              className="input"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Write a short description"
            />

            {/* Location */}
            <label htmlFor="location">Location</label>
            <input
              className="input"
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
            />

            {/* Image Upload */}
            <label htmlFor="image">Product Image*</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                width="150"
                style={{
                  marginTop: "10px",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            )}

            <button type="submit" className="uploadBtn">
              Upload & Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
