import blogService from './../services/blogs'
const initialData = { user: '', id: '', author: '', likes: '', url: '' }

export const createBlog = (data) => {
  return async dispatch => {
    const blog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const likeFor = (blog) => {
  return async dispatch => {

    const likedBlog = {
      likes: blog.likes + 1,
    }
    const updatedBlog = await blogService.like(blog.id,likedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const commentBlog = (id,data) => {
  return async dispatch => {

    const updatedBlog = await blogService.comment(id,data)
    dispatch({
      type: 'COMMENT_BLOG',
      data: updatedBlog
    })
  }
}

export const initiateBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    // const blogs = await blogService.getAll()
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const blogReducer = (state = [initialData], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'LIKE': {
    const id = action.data.id
    return state.map(a =>
      a.id !== id ? a : action.data
    )
  }
  case 'COMMENT_BLOG': {
    const id = action.data.id
    return state.map(a =>
      a.id !== id ? a : action.data
    )
  }
  case 'DELETE_BLOG':
    console.log('deletecase: ',action.data)
    return state.filter( a =>
      a.id !== action.data)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer