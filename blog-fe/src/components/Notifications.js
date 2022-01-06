import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector( state => state.notification )

  if ( notification.status !== 'hidden' ) {
    return (
      <div className={notification.style}>
        <b>{notification.msg}</b>
      </div>
    )
  } else {
    return null
  }
}

export default Notification