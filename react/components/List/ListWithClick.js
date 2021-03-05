import React from 'react'

const List = props => {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <ul onClick={props.click} className={props.classes}>
        {props.children}
      </ul>
    </>
  )
}

export default List
