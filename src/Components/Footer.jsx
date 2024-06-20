import React from "react";

export default function Footer() {
  return (
    <footer className="posts border-top text-center pt-5 pb-3 bg-light">
      <div className="d-flex justify-content-center mb-3">
        <a
          href="mailto:brim0533167854@gmail.com?subject=Interview%20Opportunity&body=Dear%20Moshe%2C%0A%0AWe%20were%20impressed%20by%20your%20portfolio%20and%20would%20like%20to%20invite%20you%20for%20an%20interview%20to%20discuss%20potential%20job%20opportunities%20with%20our%20team.%0A%0ARegards%2C%0A[Your%20Name]"
          className="btn btn-blog-link btn-circle me-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-envelope"></i>
        </a>
        <a
          href="https://github.com/MosheBrim"
          className="btn btn-blog-link btn-circle me-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/moshe-brim"
          className="btn btn-blog-link btn-circle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
      <p>Copyright © Blog {new Date().getFullYear()}</p>
    </footer>
  );
}
