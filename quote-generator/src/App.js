import React, { useEffect, useState } from "react";
import QuoteBox from "./components/QuoteBox";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");

  const getQuote = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error:", error);
      setQuote("Failed to load quote");
      setAuthor("System");
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="app">
      <h1>Quote Generator</h1>
      <QuoteBox quote={quote} author={author} onNewQuote={getQuote} />
    </div>
  );
}

export default App;