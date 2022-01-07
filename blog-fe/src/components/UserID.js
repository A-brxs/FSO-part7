import React from 'react'
import { useSelector } from 'react-redux'
import { useParams,Link } from 'react-router-dom'

const UserID = () => {
  let { id } = useParams()
  const users = useSelector( s => s.users)
  if(!users) return null
  const user = users.find( u => u.id === id )
  if(!user) return null
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