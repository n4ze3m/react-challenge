import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/home";
import UpdatePage from "./pages/update";
function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <h1>ABC Company</h1>
        <Link to="/">Home</Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
