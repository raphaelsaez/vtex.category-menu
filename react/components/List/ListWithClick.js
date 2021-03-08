import React from 'react'

const List = ({ classes, click, children }) => {
  return (
    <>
      <ul onClick={click} className={classes}>
        {children}
      </ul>
    </>
  )
}

export default List
