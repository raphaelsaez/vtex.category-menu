import React from 'react'

const Item = props => {
  return (
    <>
      <li className={props.classes}>{props.children}</li>
    </>
  )
}

export default Item
