import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const LOCAL_STORAGE_KEY = "products";

const ProductShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    const found = products.find(p => p.id === parseInt(id));
    if (found) setProduct(found);
    else navigate("/products");
  }, [id, navigate]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>{product.title}</h1>
      <p><strong>Name:</strong> {product.title}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <br />
      <Link to="/products">back</Link> | <Link to={`/products/edit/${product.id}`}>edit</Link>
    </div>
  );
};

export default ProductShow;