import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/Nav";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";
import FeedPage from "./components/feed/FeedPage";
import PostDetail from "./components/feed/posts/PostDetail";
import ProfilePage from "./components/profile/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <Routes>
          <Route path='/' exact element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/feed/:id' element={<PostDetail />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
