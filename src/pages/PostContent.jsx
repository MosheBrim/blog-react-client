import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Comment from "../Components/Comment";
import Footer from "../Components/Footer";

const PostContent = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const myDate = (date) => {
    const today = new Date();
    if (today.getDate() === date.getDate()) {
      return "Today";
    }
    if (today.getDate() - 1 === date.getDate()) {
      return "Yesterday";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return day + "/" + month + "/" + date.getFullYear();
  };

  const formatTextWithBreaks = (text) => {
    let newText = text.replace(/\./g, ".<br />");
    newText = text.replace(/\:/g, ":<br />");
    return newText;
  };

  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState({
    postId: id,
    name: "",
    data: "",
  });

  const post = useQuery({
    queryKey: [`post${id}`],
    queryFn: () =>
      axios
        .get(`https://blog-spring-server.onrender.com/posts/${id}`)
        .then((res) => res.data),
  });

  const comments = useQuery({
    queryKey: [`comments${id}`],
    queryFn: () =>
      axios
        .get(`https://blog-spring-server.onrender.com/posts/${id}/comments`)
        .then((res) => res.data),
  });

  const sendNewComment = useMutation({
    mutationFn: (newComment) =>
      axios.post(
        `https://blog-spring-server.onrender.com/comments`,
        newComment
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(`comments${id}`);
      setNewComment({ postId: id, name: "", data: "" });
      setShowAddComment(false);
    },
  });

  if (post.isLoading || comments.isLoading || sendNewComment.isPending) {
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

  if (post.isError || comments.isError || sendNewComment.isError) {
    console.log(post.error || comments.error);
    return <div className="alert alert-danger text-center">Error</div>;
  }

  const handleAddComment = () => {
    sendNewComment.mutate(newComment);
  };

  const handleInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  return (
    <div className="posts comments  m-0 p-0">
      <div className="posts home-bg">
        <div
          className="mb-5 text-white masthead"
          style={{
            backgroundImage: `url(${post.data.image})`,
          }}
        >
          <div className="overlay"></div>
          <h1 className="post-content text-white post-content-h1 fw-bold">
            {post.data.title}
          </h1>
          <h2 className="post-content text-white post-content-h2 fw-bold">
            {post.data.description}
          </h2>
          <p className="post-content post-meta">
            Posted by {post.data.author} on{" "}
            {myDate(new Date(post.data.createdAt))}
          </p>
        </div>
        <div className="text-left text-post">
          <h4
            className="post-content post-content-h4 fw-bold"
            dangerouslySetInnerHTML={{
              __html: formatTextWithBreaks(post.data.data),
            }}
          />
        </div>
      </div>

      <div className="comment">
        <button
          className={`btn btn-primary mb-3 btn-blog ${
            showAddComment ? "btn-blog-cancel" : "btn-blog"
          }`}
          onClick={() => setShowAddComment(!showAddComment)}
        >
          {showAddComment ? "Cancel" : "Add Comment"}
        </button>

        {showAddComment && (
          <div className="mb-3">
            <div className="mb-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newComment.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="data" className="form-label">
                Comment
              </label>
              <textarea
                className="form-control"
                id="data"
                name="data"
                rows="3"
                value={newComment.data}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              className="btn btn-success btn-blog"
              onClick={handleAddComment}
            >
              Submit Comment
            </button>
          </div>
        )}

        <ul className="list-group">
          {comments.data.map((comment, index) => (
            <li
              key={index}
              className="com list-group-item bg-light mb-2 rounded"
            >
              <Comment
                name={comment.name}
                data={comment.data}
                createdAt={myDate(new Date(comment.createdAt))}
              />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default PostContent;
