import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import PostDetail from "./components/posts/PostDetail";
import EditPost from "./components/posts/EditPost";
import ProfilePage from "./pages/ProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import EditMyProfile from "./components/myprofile/EditMyProfile";
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
            <Route path='/feed/profile/:name' element={<ProfilePage />} />
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
