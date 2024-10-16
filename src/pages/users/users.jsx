import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Users() {
  const [users , setUsers] = useState([]);

  const AllUser = () => {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          setUsers(response.data);
          toast.success('Data fetched successfully!', {
            position: "top-right",
            autoClose: 3000, // 3 seconds
          });
        })
        .catch(error => {
          console.error('There was an error!', error);
          toast.error('Failed to fetch data.', {
            position: "top-right",
            autoClose: 3000, // 3 seconds
          });
        });
    }
    useEffect(() => {
      AllUser()
    }, [])
    
  return (
<div className='users'>
<table className="table">
    <thead>
      <tr>
      <th scope="col">id</th>
      <th scope="col">username</th>
        <th scope="col">phone</th>
        <th scope="col"> email</th>
        <th scope="col">company</th>
        <th scope="col">address</th>

      </tr>
    </thead>
    <tbody>
  {users.map(user => (
    <tr >
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.phone}</td>
      <td>{user.email}</td>
      <td>
      <tr className='row'> 
          <td>{user.company.bs}</td> {/* Accessing company name */}
          <td>{user.company.catchPhrase}</td> {/* Accessing company name */}
       <td>{user.company.name}</td>
        </tr>
        </td>  {/* Accessing city in the address */}
        <td>
        <tr className='row'> 
          <td>{user.address.city}</td> {/* Accessing company name */}
          <td>{user.address.street }</td> {/* Accessing company name */}
           <td>{user.address.zipcode }</td>
        </tr>
        </td>  {/* Accessing city in the address */}
    </tr>
  ))}
</tbody>

  </table>
 <ToastContainer />
   
    </div>
  )
}

export default Users