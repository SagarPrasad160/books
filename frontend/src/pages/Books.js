import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function fetchBooks() {
      const res = await axios.get("http://localhost:5000/books");
      setBooks(res.data);
    }
    try {
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteBook = async (bookId) => {
    try {
      await axios.delete("http://localhost:5000/books/" + bookId);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const booksList = books.map((book) => {
    return (
      <div key={book.id}>
        <p>{book.name}</p>
        <p>{book.desc}</p>
        <p>{book.cover}</p>
        <Link to={`/update/${book.id}`}>
          <button>Update</button>
        </Link>
        <button onClick={() => deleteBook(book.id)}>Delete</button>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <h1>Books</h1>
      <div>{booksList}</div>
      <div>
        <Link to="/add">+ Add Book</Link>
      </div>
    </div>
  );
}

export default Books;
