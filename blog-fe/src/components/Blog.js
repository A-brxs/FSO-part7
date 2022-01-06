import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeFor,deleteBlog } from '../reducers/blogReducer'


const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const loggedinUser = useSelector( state => state.user )

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const dispatch = useDispatch()

  const updateBlog = () => {
    dispatch(likeFor(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete blog: ${blog.title}?`)) {
      dispatch(deleteBlog( blog.id ))
    }
  }

  console.log('loggedinuser: ', loggedinUser.username, 'blog: ', blog)

  return (
    <div className='blog-tile' id='blog-tile'>
      <strong className="blog-title">{blog.title}</strong> <button onClick={toggleVisibility} id='view-button'>view</button>
      <p className="blog-author">{blog.author}</p>
      <div style={showWhenVisible} className='blog-toggable-info'>
        <p className='blog-url'>{blog.url}</p>
        <p className='blog-likes'>Likes: {blog.likes} <button id='like-button' className='like-button' onClick={() => updateBlog()}>like</button></p>
        {loggedinUser.username === blog.user.username &&
        <button className='delete-button'id='delete-button' onClick={() => handleDelete()}>DELETE</button> }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,

}

export default Blog