import React, { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./components/BookForm";
import BookCarousel from "./components/BookCarousel";
import "./styles/App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="app">
      <h1>My Book Collection</h1>
      <BookForm setBooks={setBooks} />
      <BookCarousel books={books} setBooks={setBooks} />
    </div>
  );
}

export default App;
