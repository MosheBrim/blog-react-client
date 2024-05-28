import React from "react";
import homeBgImage from "../assets/img/home-bg.jpg";
import { NavLink } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${homeBgImage})`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundAttachment: "scroll",
          padding: "5rem",
        }}
      >
        <h1 className="fw-bold ">My Blog</h1>
        <div className="pt-5 d-flex flex-row">
          <NavLink to={"./home"} className="home-links nav-link">
            HOME
          </NavLink>
          <NavLink to={"./home/admin"} className="home-links nav-link">
            ADMIN
          </NavLink>
        </div>
      </div>
    </div>
  );
}
