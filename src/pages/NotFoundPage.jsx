import React from 'react'
import {NavLink} from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Page not found!</h2>
      <NavLink to="/">Go back to home</NavLink>
    </div>
  )
}

export default NotFoundPage
