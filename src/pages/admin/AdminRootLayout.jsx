import React, { useState } from "react";
import { NavLink, Outlet, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function AdminRootLayout() {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", password: "" });
  const navigate = useNavigate()

  
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (user) =>
      axios.get(`http://localhost:8080/users/single/${user}`).then((res) => res.data),
    onSuccess: (data) => {
      setUser(data.name);
      navigate(`./${newUser.name}/posts`)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(newUser.name);
    mutate(newUser.name);
  };

  const handleUserInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  if (!user) {
    return (
      <div className="admin login m-0 p-0  d-flex justify-content-center align-items-center vh-100">
        <div className="card">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleUserInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleUserInputChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-blog btn-primary" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
              {error && <div className="alert alert-danger mt-3">{error.message}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="root-layout d-flex vh-100">
      <div className="sidebar d-flex flex-column" id="sidebar" style={{ height: "100vh" }}>
        <div className="nav flex-column mt-3">
          <NavLink to={`./${user}/posts`} className="nav-link links">
            POSTS
          </NavLink>
          <NavLink to={`./${user}/comments`} className="nav-link links">
            COMMENTS
          </NavLink>
          <NavLink to={`./${user}/users`} className="nav-link links">
            USERS
          </NavLink>
        </div>
        <div className="nav flex-column mt-auto">
          <NavLink to="/" className="nav-link links">
            HOME
          </NavLink>
          <NavLink onClick={()=>{setUser("")}} to="/admin" className="nav-link links out-link">
            LOGOUT
          </NavLink>
        </div>
      </div>
      <div className="admin content flex-grow-1" >
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}