import React from 'react'
import { Link } from 'react-router-dom'

const LinkComponent = ({children, ...props}) => {
  return (
    <Link {...props}>
      {children}
    </Link>
  )
}

export default LinkComponent
