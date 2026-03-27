import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LOCAL_STORAGE_KEY = "products";

const ProductNew = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: "", price: "", description: "" });

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCreate = e => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    const newProduct = { ...product, id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1 };
    const updated = [...products, newProduct];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    navigate("/products");
  };

  return (
    <div className="container">
      <h1>New Product</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label>Name: </label>
          <input name="title" value={product.title} onChange={handleChange} />
        </div>
        <div>
          <label>Price: </label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div>
          <label>Description: </label>
          <textarea name="description" value={product.description} onChange={handleChange} />
        </div>
        <br />
        <button type="submit" className="create">Create</button> | <Link to="/products">Home</Link>
      </form>
    </div>
  );
};

export default ProductNew;