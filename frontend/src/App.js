import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
