import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function AddBook() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/books", { name, desc, cover });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="book name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="cover url"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
