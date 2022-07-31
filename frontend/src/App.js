import React, { useEffect, useContext } from "react";
import Loading from "./components/PostDataLoading";
import Posts from "./pages/Posts";
import axiosInstance from "./axios";
import { PostsContext } from "./postsContext";
import "./App.css";

function App() {
  const { data, loading, updateData, updateLoading } = useContext(PostsContext);

  useEffect(() => {
    axiosInstance
      .get("posts/")
      .then((data) => {
        console.log(data.data);
        updateData(data.data);
        updateLoading(false);
      })
      .catch((err) => console.log(err));
  }, [updateData, updateLoading]);

  const appDiv = loading ? <Loading /> : <Posts posts={data} />;

  return <div className="app">{appDiv}</div>;
}

export default App;
