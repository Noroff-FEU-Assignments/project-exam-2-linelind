import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/Nav";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";
import Feed from "./components/feed/FeedPage";
import Profile from "./components/profile/ProfilePage";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path='/' exact element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
