import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";
import FeedPage from "./components/feed/FeedPage";
import PostDetail from "./components/feed/posts/PostDetail";
import EditPost from "./components/feed/posts/EditPost";
import ProfileDetail from "./components/feed/profiles/ProfileDetail";
import MyProfilePage from "./components/user/MyProfilePage";
import EditMyProfile from "./components/user/EditMyProfile";
import { AuthProvider } from "./context/AuthContext";
import "./sass/style.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='contentWrapper'>
          <NavBar />

          <Routes>
            <Route path='/' exact element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/feed' element={<FeedPage />} />
            <Route path='/feed/post/:id' element={<PostDetail />} />
            <Route path='/feed/post/edit/:id' element={<EditPost />} />
            <Route path='/feed/profile/:name' element={<ProfileDetail />} />
            <Route path='/myprofile' element={<MyProfilePage />} />
            <Route path='/myprofile/edit/:name' element={<EditMyProfile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
