const initialState = {
  msg: '',
  style: '',
  status: 'hidden'
}

const showNotification = (notification,style) => {
  console.log('THIS IS NOTIFCHANGE')
  return {
    type: 'SET_NOTIFICATION',
    style: style,
    msg: notification,
    status: 'shown'
  }
}

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
    msg: '',
    status: 'hidden'
  }
}

export const setNotification = ( notification, style, timeout ) => {
  return async dispatch => {
    dispatch(showNotification(notification, style))
    await setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000 )
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('initial state', initialState)
  switch(action.type) {
  case 'SET_NOTIFICATION':
    console.log('SET NOTIFICATION')
    return action
  case 'HIDE_NOTIFICATION':
    console.log('HIDE NOTIFICATION')
    return action
  default:
    console.log('default')
    return state
  }
}


export default notificationReducer

