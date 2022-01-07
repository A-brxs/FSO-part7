import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeFor } from '../reducers/blogReducer'

const BlogID = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector( s => s.blogs.find( b => b.id === id ))

  const updateBlog = () => {
    dispatch(likeFor(blog))
  }

  return (
    <div >
      <h2>{blog.title}</h2>
      <ul>{blog.url}</ul>
      <ul>{blog.likes}<button id='like-button' className='like-button' onClick={() => updateBlog()}>like</button></ul>
      <ul>added by {blog.user.username}</ul>
    </div>
  )

}

export default BlogID