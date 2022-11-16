import React from 'react'

function UserHeader({ name }) {
  return (
    <div className="header">
        <h1>Welcome back<br />{ name+"!" }</h1>
        <button className="edit-button">Edit Name</button>
    </div>
  )
}

export default UserHeader