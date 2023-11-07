import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function UpdateBook() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const getBook = useCallback(
    async function () {
      const { data } = await axios.get("http://localhost:5000/books/" + id);
      const { name, desc, cover } = data[0];
      setName(name);
      setDesc(desc);
      setCover(cover);
    },
    [id]
  );
  useEffect(() => {
    getBook();
  }, [getBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !desc || !cover) {
      return alert("Please fill all fields!");
    }
    try {
      await axios.put("http://localhost:5000/books/" + id, {
        name,
        desc,
        cover,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Update Book</h1>
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
            placeholder="book description"
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
        <button>Update</button>
      </form>
    </div>
  );
}

export default UpdateBook;
