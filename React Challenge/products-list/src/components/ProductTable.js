import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LOCAL_STORAGE_KEY = "products";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const localProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localProducts) {
      setProducts(JSON.parse(localProducts));
    } else {
      fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
          const simplified = data.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price
          }));
          setProducts(simplified);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(simplified));
        });
    }
  }, []);

  const handleDelete = (id) => {
    const filtered = products.filter(p => p.id !== id);
    setProducts(filtered);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  };

   return (
    <div className="container">
      <h1>products:</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>
                {p.description.length > 50 ? (
                  <>
                    {p.description.substring(0, 50)}...
                    <Link to={`/products/show/${p.id}`}> show more</Link>
                  </>
                ) : (
                  p.description
                )}
              </td>
              <td>${p.price}</td>
              <td>
                <Link to={`/products/show/${p.id}`}>Show</Link> I{" "}
                <Link to={`/products/edit/${p.id}`}>Edit</Link> {" "}
                <button className="delete" onClick={() => handleDelete(p.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/products/new">Add product</Link>
    </div>
  );
};

export default ProductTable;