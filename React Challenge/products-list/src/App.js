import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductTable from "./components/ProductTable";
import ProductShow from "./components/ProductShow";
import ProductEdit from "./components/ProductEdit";
import ProductNew from "./components/ProductNew";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductTable />} />
      <Route path="/products/show/:id" element={<ProductShow />} />
      <Route path="/products/edit/:id" element={<ProductEdit />} />
      <Route path="/products/new" element={<ProductNew />} />
    </Routes>
  );
}

export default App;