import React, { useEffect } from 'react'
import Notification from './components/Notifications'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toggle'
import Users from './components/Users'
import UserID from './components/UserID'
import BlogID from './components/BlogID'
import {  useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initiateBlog } from './reducers/blogReducer'
import { cookieLogin, firstLogin, logoutUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'
import { initiateUsers, setToken } from './reducers/usersReducer'


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

  useEffect(() => {
    if (user) dispatch(setToken(user.token))
    dispatch(initiateUsers())
  },[])

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
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
    </div>
  )

  const logoutForm = () => (
    <button onClick={() => handleLougout()}>LOGOUT</button>
  )
  const padding = {
    padding: 5
  }

  console.log(user)
  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <h1>Blog system</h1>
        <Notification />
        {(user === null || '')
          ? loginForm()
          : <div>
            <p>{user.username} logged-in</p>
            { logoutForm() }
          </div>
        }
      </div>
      <Switch>
        <Route exact path="/">
          {!(user === null || '') &&
            <div>
              <Toggle buttonLabel='Create blog'>
                <BlogForm />
              </Toggle>
              {blogList()}
            </div>
          }
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route path="/users/:id">
          <UserID />
        </Route>
        <Route path="/blogs/:id">
          <BlogID />
        </Route>
      </Switch>



    </Router>
  )
}

export default App