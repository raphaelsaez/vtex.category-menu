import React, { useRef } from 'react'
import { categoryItemShape } from '../propTypes'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import PropTypes from 'prop-types'
import styles from '../categoryMenu.css'
import Department from './Department/Department'

/**
 * Component responsible dor rendering an array of categories and its respective subcategories
 */
const ItemContainer = ({ containerStyle, departments, parentSlug }) => {
  const containerRef = useRef(null)
  const containerClasses = classNames(
    styles.submenuList,
    'w-100 flex flex-wrap pa0 list mw9 flex-column justify-start'
  )

  return (
    <div
      ref={containerRef}
      className={`${styles.itemContainer} ${
        styles['itemContainer--category']
      } absolute w-75 left-1 bg-base pb2 bw1 bb b--muted-3 overflow-y-auto`}
      style={containerStyle}
    >
      <Container
        className={`${styles['section--category']} justify-center w-100 flex`}
      >
        <ul className={containerClasses}>
          {departments.map(department => (
            <Department
              key={department.name}
              department={department}
              parentSlug={parentSlug}
              containerRef={containerRef}
            />
          ))}
        </ul>
      </Container>
    </div>
  )
}

ItemContainer.propTypes = {
  departments: PropTypes.arrayOf(categoryItemShape),
  parentSlug: PropTypes.string,
  showSecondLevel: PropTypes.bool,
  containerStyle: PropTypes.object,
}

export default ItemContainer
