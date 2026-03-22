import React from "react";

function QuoteBox({ quote, author, onNewQuote }) {
  return (
    <div className="quote-box">
      <p className="quote">"{quote}"</p>
      <p className="author">- {author}</p>

      <button onClick={onNewQuote} className="btn">
        New Quote
      </button>
    </div>
  );
}

export default QuoteBox;