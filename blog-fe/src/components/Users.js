import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector( state => state.users )

  if (!users) {
    return (
      <div></div>
    )
  }
  return (
    <div >
      <h2>THIS IS THE USER PAGE</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
          {
            users.map( u => (
              <tr key={u.id}>
                {/* <td><a href={`/users/${u.id}`}>{u.username}</a></td> */}
                <td>
                  <Link to={`/users/${u.id}`}>{u.username}</Link>
                </td>
                <td>{u.count}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

}

export default Users