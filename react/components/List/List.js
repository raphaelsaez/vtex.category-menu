import React from 'react'

const List = props => {
  return (
    <>
      <ul className={props.classes}>{props.children}</ul>
    </>
  )
}

export default List
