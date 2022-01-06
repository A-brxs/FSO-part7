import React from 'react'
import {  useDispatch } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'


const BlogForm = () => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    console.log(event)
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    console.log('this is blogobject: ',blogObject)
    try {
      // await blogService
      //   .create(blogObject)
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`Blog ${blogObject.title} created for author ${blogObject.author}`,'info',10))
    } catch (exception) {
      dispatch(setNotification('Missing information','error',5))
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    // setNewBlog(blogObject)
  }
  return (

    <form onSubmit={addBlog}>
      <div>
      title <input type="text" id='title' name="title" />
      </div>
      <div>
      author <input type="text" id='author' name="author" />
      </div>
      <div>
      url <input type="url" id='url' name="url" />
      </div>
      <button type="submit" id='create-button'>Create</button>
    </form>
  )
}
export default BlogForm