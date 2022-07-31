import React, { useState, useContext } from "react";
import "./css/Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";
import { PostsContext } from "../postsContext";

export default function Header() {
  let navigate = useNavigate();
  let { pathname } = useLocation();
  const [searchText, setSearchText] = useState("");
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const { updateData, updateLoading } = useContext(PostsContext);
  const isMainPage = pathname === "/";

  const handleButton = () => {
    if (isLoggedIn) {
      //sign out by putting refresh token into blacklist
      axiosInstance.post("logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers["Authorization"] = null;
      navigate("../login");
    } else {
      navigate("../login");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateLoading(true);
    console.log("search/?search=" + searchText);
    axiosInstance.get("search/?search=" + searchText).then((data) => {
      console.log(data.data);
      updateData(data.data);
      updateLoading(false);
    });
  };

  const buttonText = isLoggedIn ? "Sign Out" : "Sign In";

  const handleCreatePost = () => {
    navigate("../create-post");
  };

  return (
    <div className="navbar_container">
      <div>
        <span>
          <Link to="/" style={{ textDecoration: "none", color: "#222" }}>
            PrepDS
          </Link>
        </span>
      </div>
      {isLoggedIn && isMainPage && (
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search_field"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      )}
      {isMainPage && (
        <button onClick={() => handleCreatePost()}>Create Post</button>
      )}
      <button onClick={() => handleButton()}> {buttonText} </button>
    </div>
  );
}
