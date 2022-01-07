import React from 'react'
import { useSelector } from 'react-redux'
import { useParams,Link } from 'react-router-dom'

const UserID = () => {
  let { id } = useParams()
  const user = useSelector( s => s.users.find( u => u.id === id ))
  return (
    <div >
      <h2>{user.username}</h2>
      <ul>
        {user.blogs.map( b => (<li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>) )}
      </ul>
    </div>
  )

}

export default UserID