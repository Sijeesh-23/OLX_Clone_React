import React, { Fragment } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getFirestore, collection, addDoc } from "firebase/firestore";
//import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { useState, useContext, useEffect } from "react";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [items, setItems] = useState([]);

  const db = getFirestore(firebase);
  const auth = getAuth(firebase);
  //const storage = getStorage(firebase);


  // Load saved items from localStorage on mount
    useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    setItems(stored);
    }, []);

  // Convert selected image to data URL for preview + storag
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result); // base64 string
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create unique ID
    const id = Date.now();
    const newItem = { id, name, category, price, image };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    // Save to localStorage
    localStorage.setItem("items", JSON.stringify(updatedItems));

    setImage(null);
    setPreview(null);

    if (!user) {
      alert("Please log in first!");
      return;
    }

    try {
      // 1️⃣ Upload image to Firebase Storage
     // const storageRef = ref(storage, `images/${image.name}`);
      //await uploadBytes(storageRef, image);

      // 2️⃣ Get image URL
      //const imageUrl = await getDownloadURL(storageRef);

      // 3️⃣ Add data to Firestore
      await addDoc(collection(db, "products"), {
        name,
        category,
        price: Number(price),
        image,
        userId: user.uid, // ✅ associate with logged-in user
        createdAt: new Date().toISOString(),
      });

      alert("Product uploaded successfully!");
      // Optionally reset form
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}/>
            <br />
          <br />
          {preview && (
          <img
            src={preview}
            alt="Preview"
            width="150"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
          )}
            <input type="file" 
            accept="image/*"
            onChange={handleImageChange}
            required/>
            <br />  
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
