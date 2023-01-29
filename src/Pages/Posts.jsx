import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  const { id } = useParams()


  useEffect(() => {
    async function fetchPosts() { //have to put async function in useEffect w/ await
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts/1") //use axios to cut down code instead of "fetch"
      console.log(data)
    }
    fetchPosts();
  }, []
  ) //runs every time the page loads

  return (
    <div>
      {id}
    </div>
  )
}

export default Posts;