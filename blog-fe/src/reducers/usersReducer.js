import userService from './../services/users'
const initialState = null

export const setToken = (token) => {
  return async dispatch => {
    await userService.setToken(token)
    dispatch({
      type: 'SET_TOKEN'
    })
  }
}

export const initiateUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    const modifiedUsers = users
      .map( u => ({
        ...u,
        count: u.blogs.length
      }))
    dispatch({
      type: 'INIT_USERS',
      data: modifiedUsers
    })
  }
}


const usersReducer = (state = initialState, action) => {
  console.log('initial state', initialState)
  switch(action.type) {
  case 'SET_TOKEN':
    return state
  case 'INIT_USERS':
    return action.data
  default:
    console.log('default')
    return state
  }
}


export default usersReducer
