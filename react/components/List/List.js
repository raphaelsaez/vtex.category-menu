import React from 'react'

const List = ({ classes, children }) => {
  return (
    <>
      <ul className={classes}>{children}</ul>
    </>
  )
}

export default List
