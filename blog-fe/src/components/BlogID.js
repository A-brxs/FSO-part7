import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog, deleteBlog, likeFor } from '../reducers/blogReducer'

const BlogID = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector( s => s.blogs.find( b => b.id === id ))
  const loggedinUser = useSelector( state => state.user )

  const updateBlog = () => {
    dispatch(likeFor(blog))
  }
  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete blog: ${blog.title}?`)) {
      dispatch(deleteBlog( blog.id ))
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const commentObject = {
      comment: [{
        text: event.target.comment.value
      }]
    }
    console.log('this is blogobject: ',commentObject)
    dispatch(commentBlog(blog.id,commentObject))
  }

  if (!blog) return null
  return (
    <div >
      <h2 className='title is-2'>{blog.title}</h2>
      <div className="content">
        <ul>{blog.url}</ul>
        <ul>{blog.likes}<button id='like-button' className='like-button' onClick={() => updateBlog()}>like</button></ul>
        <ul>added by {blog.user.username}</ul>
        {loggedinUser.username === blog.user.username &&
          <button className='delete-button'id='delete-button' onClick={() => handleDelete()}>DELETE</button> }
        <br/>
        <br/>
        <form onSubmit={addComment}>
          <div>
          comment: <input type="text" id='comment' name="comment" />
          </div>
          <br/>
          <button className='button is-success is-small' type="submit" id='create-button'>comment</button>
        </form>
        <h3 className='title is-3'>comments</h3>
        <ul>
          {blog.comments.map( c => (
            <li key={c.id}> {c.text} </li>
          ))}
        </ul>
      </div>
    </div>
  )

}

export default BlogID