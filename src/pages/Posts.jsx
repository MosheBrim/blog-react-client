import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import homeBgImage from "../assets/img/home-bg.jpg";
import Footer from "../Components/Footer";

export default function Posts() {
  const myDate = (date) => {
    const today = new Date();
    if (today.getDate() == date.getDate()) {
      return "Today";
    }
    if (today.getDate() - 1 == date.getDate()) {
      return "Yesterday";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return day + "/" + month + "/" + date.getFullYear();
  };

  const navigate = useNavigate();

  const posts = useQuery({
    queryKey: ["allPosts"],
    queryFn: () =>
      axios.get("http://localhost:8080/posts").then((res) => res.data),
  });

  if (posts.isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (posts.isError) {
    console.log(posts.error);
    return <div className="alert alert-danger">Error</div>;
  }

  const handleClick = (id) => {
    navigate(`post/${id}`);
  };

  return (
    <div className="posts container-fluid m-0 p-0">
      <div className="home-bg">
        <div
          className="home-bg-container text-center mb-5 text-white"
          style={{
            backgroundImage: `url(${homeBgImage})`,
            backgroundSize: "cover",
            backgroundAttachment: "scroll",
            padding: "5rem",
          }}
        >
          <h1 className="fw-bold">My Blog</h1>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {posts.data.map((post, index) => (
              <div key={index} className="post-preview post mb-5">
                <a
                  href=""
                  onClick={() => handleClick(post.id)}
                  className="post-link"
                >
                  <h2 className="post-title">{post.title}</h2>
                  <h3 className="post-subtitle">{post.description}</h3>
                </a>
                <hr className="my-4 " />

                <p className="post-meta">
                  Posted by {post.author} on {myDate(new Date(post.createdAt))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
