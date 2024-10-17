import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function ModaluserDelete({ user, showModalDelete, handleClose, handleDelete }) {
    const apiUrl = process.env.REACT_APP_API_URL;

    const confirmDelete = async () => {
        if (user) {
            try {
                await axios.delete(`${apiUrl}/users/${user.id}`); // Make sure this matches your API endpoint
                handleDelete(user.id); // Call the parent's handleDelete function
                handleClose(); // Close the modal
                toast.success('User deleted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error('Failed to delete user.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        }
    };

    if (!user) return null; // Prevent rendering if there's no user selected

    return (
        <div className={`modal fade ${showModalDelete ? 'show' : ''}`} style={{ display: showModalDelete ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Delete User: {user.username}</h1>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this user?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
