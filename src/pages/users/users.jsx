import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModaluserEdit from '../../composants/modaluser/modaluser';
import ModaluserDelete from '../../composants/modalDelete/modalDelete';

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const toastShown = useRef(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchUsers = () => {
    axios
      .get(`${apiUrl}/users`)
      .then((response) => {
        setUsers(response.data);
        if (!toastShown.current) {
          toast.success('Data fetched successfully!', {
            position: "top-right",
            autoClose: 3000,
          });
          toastShown.current = true;
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
        if (!toastShown.current) {
          toast.error('Failed to fetch data.', {
            position: "top-right",
            autoClose: 3000,
          });
          toastShown.current = true;
        }
      });
  };

  const handleOpenModal = (user) => {
    if (user) {
      setSelectedUser(user); // Store the selected user for editing
      setShowModal(true); // Show the edit modal
    }
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId)); // Update state by removing the deleted user
  };

  const handleOpenModalDelete = (user) => {
    console.log(user);
    setSelectedUser(user);
    setShowModalDelete(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts
  }, []);

  return (
    <div className="users">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.city} {user.address.street} {user.address.zipcode}</td>
              <td>
                <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleOpenModal(user)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleOpenModalDelete(user)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModaluserEdit
        user={selectedUser}
        showModal={showModal}
        handleClose={handleCloseModal}
        onUpdate={fetchUsers} // Pass the fetchUsers function to refresh the list
      />
      <ModaluserDelete
        user={selectedUser}
        showModalDelete={showModalDelete}
        handleClose={handleCloseModalDelete} // Consistent naming
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </div>
  );
}

export default Users;
