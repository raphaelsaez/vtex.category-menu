import React from 'react'

const Item = ({ classes, children }) => {
  return (
    <>
      <li className={classes}>{children}</li>
    </>
  )
}

export default Item
