import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/Nav";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
