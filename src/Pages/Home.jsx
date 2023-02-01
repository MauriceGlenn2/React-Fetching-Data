import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams()
  const [users, setUsers] = useState([])

  async function getUsers() {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users?userid=${id}`)
    setUsers(data)
    console.log(data)
    // console.log(username)
  }

  useEffect(() => {
    getUsers();
  }, []
  )

  return (
    <div className="container">
      <div className="row">
        <div className="user-list">
          {users.map((user) => (
            <div className="user">
              <div className="user-card">
                <div className="user-card__container">
                  <h3>{user.name}</h3>
                  <p>
                    <b>{user.email}:</b>
                  </p>
                  <p>
                    <b>Phone:</b> {user.phone}
                  </p>
                  <p>
                    <b>Website:</b>
                    {user.website}
                  </p>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home;