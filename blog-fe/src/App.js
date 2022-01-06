import React, { useEffect } from 'react'
import Notification from './components/Notifications'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toggle'
// import blogService from './services/blogs'
import {  useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initiateBlog } from './reducers/blogReducer'
import { cookieLogin, firstLogin, logoutUser } from './reducers/userReducer'


const App = () => {


  const dispatch = useDispatch()
  const blogs = useSelector( state => state.blogs)
  const user = useSelector( state => state.user)

  useEffect(() => {
    dispatch(initiateBlog())
  }, [user,dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log('there is cookie!')
      const usr = JSON.parse(loggedUserJSON)
      dispatch(cookieLogin(usr))
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    let username = event.target.username.value
    let password = event.target.password.value
    try {
      dispatch(firstLogin({ username, password }))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials','error',5))
    }
  }

  const handleLougout = () => {
    console.log('Logging out')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id='username'
          name="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          name="password"
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <div id='blog-list'>
        {blogs
          .sort( (a,b) => b.likes - a.likes )
          .map(blog =>
            // <Blog loggedinUser={user} key={blog.id} blog={blog} setUpdatedBlog={setUpdatedBlog}/>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
    </div>
  )

  const logoutForm = () => (
    <button onClick={() => handleLougout()}>LOGOUT</button>
  )

  console.log(user)
  return (
    <div>
      <h1>Blog system</h1>
      <Notification />
      {(user === null || '')
        ?
        loginForm()
        :
        <div>
          <p>{user.username} logged-in</p>
          <Toggle buttonLabel='Create blog'>
            <BlogForm />
          </Toggle>
          {logoutForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App