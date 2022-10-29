import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/Nav";
import Login from "./components/login/LoginPage";
import RegisterUser from "./components/login/RegisterUser";
import Feed from "./components/feed/FeedPage";
import Profile from "./components/profile/ProfilePage";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/register' element={<RegisterUser />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
