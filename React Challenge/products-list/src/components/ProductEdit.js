import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const LOCAL_STORAGE_KEY = "products";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: "", price: "", description: "" });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    const found = products.find(p => p.id === parseInt(id));
    if (found) setProduct(found);
    else navigate("/products");
  }, [id, navigate]);

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = e => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    const updated = products.map(p => (p.id === product.id ? product : p));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    navigate("/products");
  };

  return (
    <div className="container">
      <h1>Edit {product.title}</h1>
      <form onSubmit={handleUpdate}>
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
        <button type="submit" className="update">Update</button> | <Link to="/products">Home</Link>
      </form>
    </div>
  );
};

export default ProductEdit;