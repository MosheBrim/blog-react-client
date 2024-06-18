import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaEye, FaEyeSlash, FaEdit, FaTrashAlt } from "react-icons/fa";

export default function AdminUsers() {
  const { user } = useParams();
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const users = useQuery({
    queryKey: ["allUsers"],
    queryFn: () =>
      axios
        .get(`https://blog-spring-server.onrender.com/admin/users/${user}`)
        .then((res) => res.data),
  });

  const sendNewUser = useMutation({
    mutationFn: (newUser) =>
      axios.post(`https://blog-spring-server.onrender.com/admin/users/${user}`, newUser),
    onSuccess: (response) => {
      console.log(response.data);
      queryClient.invalidateQueries("allUsers");
      setNewUser({
        name: "",
        password: "",
      });
      setShowAddUserModal(false);
    },
  });

  const deleteUser = useMutation({
    mutationFn: (userName) =>
      axios.delete(`https://blog-spring-server.onrender.com/admin/users/${user}/${userName}`),
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers");
      setShowDeleteConfirmModal(false);
    },
  });

  if (users.isLoading || sendNewUser.isPending || deleteUser.isPending) {
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

  if (users.isError || sendNewUser.isError || deleteUser.isError) {
    console.log(users.error);
    return <div className="alert alert-danger">Error</div>;
  }

  const handleAddUser = () => {
    sendNewUser.mutate(newUser);
  };

  const handleUserInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleDeleteUser = (userName) => {
    setUserName(userName);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteUser.mutate(userName);
  };

  return (
    <div className="admin container mt-5">
      <h2 className="mb-4">Manage Users</h2>
      <button
        className="btn btn-blog btn-primary mb-3"
        onClick={() => setShowAddUserModal(true)}
      >
        Add User
      </button>

      <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleUserInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              rows="3"
              value={newUser.password}
              onChange={handleUserInputChange}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-blog-cancel btn-secondary"
            onClick={() => setShowAddUserModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-blog btn-success" onClick={handleAddUser}>
            Submit User
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDeleteConfirmModal}
        onHide={() => setShowDeleteConfirmModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this User?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-blog-cancel btn-secondary"
            onClick={() => setShowDeleteConfirmModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-blog-red btn-danger"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Password</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn btn-blog-red btn-danger"
                    onClick={() => handleDeleteUser(user.name)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
