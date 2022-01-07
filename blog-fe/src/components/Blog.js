import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <div className='blog-tile' id='blog-tile'>
      <strong className="blog-title"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></strong>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,

}

export default Blog