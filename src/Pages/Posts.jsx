import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  const { id } = useParams()
  let navigate = useNavigate()
  const [posts, setPosts] = useState([]) // declaring variables
  const [loading, setLoading] = useState();
  const [searchID, setSearchID] = useState(id)


  // function for searching by ID
  function onSearch() {
    fetchPosts(searchID)

  }

  async function fetchPosts(userID) { //have to put async function in useEffect w/ await
    setLoading(true)
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userID || id}`) //use axios to cut down code instead of "fetch"
    setPosts(data)
    setLoading(false)
  }

function onSearchKeyPress(key){
  if (key === 'Enter'){
    onSearch()
  }
}

  useEffect(() => {
    fetchPosts();
  }, []
  ) //runs every time the page loads

  return (
    <>
      <div className="post__search">
        
          <button onClick={() => navigate('/')}>← Back</button>
 
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number" value={searchID} onChange={(event) => setSearchID(event.target.value)}
            onSearchKeyPress={(event) => onSearchKeyPress(event.key) //need to fix search by hitting "enter" button
          }
          />
          {/* Fetch post by input, by value */}
          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>
      {
        loading ? (
          new Array(10).fill(0).map((element, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        )
          :
          (
            posts.map(post => (
              <div className="post" key={post.id}>
                <div className="post__title">{post.title}</div>
                <p className="post__body">{post.body}</p>
              </div>
            ))
          )
      }
    </>





  )
}

export default Posts;


// How to map over every post  <div>
//{ posts.map(post => <div>{post.title}</div>) }
// if using map you need to return it, or use () and it returns itself (line 35)
//37 shows loading state at 3G, 38 need to creat a new array to map over 10x to show loading state on all 10 posts
//35 how to search by value, create usestate, create value, create onchange event, set event to "event.target.value"
//38 On Key press no longer able to use

//Routing programmatically
//2 useNavagate to route
//7 let navigate = useNavigate()
//41 set in button onclick