import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import homeBgImage from "../assets/img/home-bg.jpg";
import Footer from "../Components/Footer";
import getServiceUrl from "../Service";
import blogScape from "../assets/img/BlogScape.jpeg";

export default function Posts() {
  const serviceUrl = getServiceUrl();
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

  const {
    data: postsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () =>
      axios
        .get(`${serviceUrl}/posts`)
        .then((res) => {
          console.log("Data:", res.data);
          return res.data;
        })
        .catch((err) => {
          console.error("API Error:", err);
          throw err;
        }),
  });

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center custom-spinner-color"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border custom-spinner-color" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return <div className="alert alert-danger">Error</div>;
  }

  if (!Array.isArray(postsData)) {
    console.error("Expected an array of posts but got:", postsData);
    return <div className="alert alert-danger">Unexpected data format</div>;
  }

  const handleClick = (id) => {
    navigate(`post/${id}`);
  };

  return (
    <div className="posts container-fluid m-0 p-0">
      <div className="home-bg">
        <div
          className="masthead text-center mb-5 text-white"
          style={{
            backgroundImage: `url(${homeBgImage})`,
          }}
        >
          <div className="overlay"></div>

          <div className="logo-container">
            <img className="logo" src={blogScape} alt="blog-scape" />
            <h1 className="fw-bold text-white blog-title">My Blog</h1>
          </div>
          <h2 className="post-content text-white post-content-h2 fw-bold">
            Join me on a journey through thoughts, experiences and insights
            across diverse topics from a personal perspective.
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {postsData.map((post, index) => (
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
