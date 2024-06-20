import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaEye, FaEyeSlash, FaEdit, FaTrashAlt } from "react-icons/fa";
import getServiceUrl from '../../Service';


export default function AdminComments() {
  const serviceUrl = getServiceUrl();
  const { user } = useParams();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [CommentId, setCommentId] = useState("");
  

  const queryClient = useQueryClient();

  const comments = useQuery({
    queryKey: ["allComments"],
    queryFn: () =>
      axios
        .get(`${serviceUrl}/admin/${user}/comments`)
        .then((res) => res.data),
  });

  const deleteComment = useMutation({
    mutationFn: (CommentId) =>
      axios.delete(`${serviceUrl}/admin/comments/${user}/${CommentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries("allComments");
      setShowDeleteConfirmModal(false);
    },
  });

  if (comments.isLoading || deleteComment.isPending) {
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

  if (comments.isError || deleteComment.isError) {
    console.log(comments.error);
    return <div className="alert alert-danger">Error</div>;
  }

  const handleDeleteComment = (CommentId) => {
    setCommentId(CommentId);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteComment.mutate(CommentId);
  };

  return (
    <div className="admin container mt-5">
      <h2 className="mb-4">Manage Comments</h2>

      <Modal
        show={showDeleteConfirmModal}
        onHide={() => setShowDeleteConfirmModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Comment?</Modal.Body>
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
              <th>ID</th>
              <th>Name</th>
              <th>Content</th>
              <th>Created At</th>
              <th>Post ID</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {comments.data.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.name}</td>
                <td>{comment.data}</td>
                <td>{comment.createdAt}</td>
                <td>{comment.postId}</td>
                <td>
                  <button
                    className="btn btn-blog-red btn-danger"
                    onClick={() => handleDeleteComment(comment.id)}
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
