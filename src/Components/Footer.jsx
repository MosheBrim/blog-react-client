import React from "react";

export default function Footer() {
  return (
    <footer className="posts border-top text-center pt-5 pb-3 bg-light">
      <div className="d-flex justify-content-center mb-3">
        <a href="https://github.com/MosheBrim" className="btn btn-blog-link btn-circle me-2" target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/moshe-brim" className="btn btn-blog-link btn-circle" target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
      <p>Copyright © Blog {new Date().getFullYear()}</p>
    </footer>
  );
}
