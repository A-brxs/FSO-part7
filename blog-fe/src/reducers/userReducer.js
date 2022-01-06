import loginService from './../services/login'
import blogService from './../services/blogs'
const initialState = null

export const firstLogin = (data) => {
  return async dispatch => {
    const user = await loginService.login(data)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    await blogService.setToken(user.token)
    dispatch({
      type: 'LOG_USER',
      data: user,
    })
  }
}

export const cookieLogin = (data) => {
  console.log('cookie: ', data)
  return async dispatch => {
    await blogService.setToken(data.token)
    dispatch({
      type: 'LOG_USER',
      data: data,
    })
  }
}

export const logoutUser = () => {
  console.log('logout ')
  return async dispatch => {
    await blogService.setToken('')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

const userReducer = (state = initialState, action) => {
  console.log('initial state', initialState)
  switch(action.type) {
  case 'LOG_USER':
    return action.data
  case 'LOGOUT_USER':
    return initialState
  default:
    console.log('default')
    return state
  }
}


export default userReducer

