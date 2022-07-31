import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import EditPost from "./pages/EditPost";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PostDetail from "./pages/PostDetail";
import { PostsContextProvider } from "./postsContext";
import CreatePost from "./pages/CreatePost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <PostsContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:slug/edit" element={<EditPost />} />
        </Routes>
        <Footer />
      </PostsContextProvider>
    </BrowserRouter>
  </>
);
