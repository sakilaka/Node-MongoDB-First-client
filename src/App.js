import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    fetch('http://localhost:5000/users', {
      method: "post",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
      })
      .catch(err => console.log(err))
    event.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='name' /> <br />
        <input type="email" name="email" id="" placeholder='email' /> <br />
        <button>Add User</button>
      </form>
      <h2>Users : {users.length}</h2>
      {
        users.map(user => <p key={user._id}>{user.name} {user.email} </p>)
      }
    </div>
  );
};

export default App;