import React from 'react'
import { categoryItemShape } from '../propTypes'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import PropTypes from 'prop-types'
import styles from '../categoryMenu.css'
import Department from './Department/Department'

/**
 * Component responsible dor rendering an array of categories and its respective subcategories
 */
const ItemContainer = ({
  containerStyle,
  departments,
  parentSlug,
}) => {
  const containerClasses = classNames(
    styles.submenuList,
    'w-100 flex flex-wrap pa0 list mw9 flex-column justify-start'
  )

  return (
    <div
      className={`${styles.itemContainer} ${
        styles['itemContainer--category']
      } absolute w-100 left-0 bg-base pb2 bw1 bb b--muted-3`}
      style={containerStyle}
    >
      <Container
        className={`${styles['section--category']} justify-center w-100 flex`}
      >
        <ul className={containerClasses}>
          {departments.map(department => (
            <li key={department.name} className={`${styles.submenuItem} dib`}>
              <Department
                key={department.name}
                department={department}
                parentSlug={parentSlug}
              />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

ItemContainer.propTypes = {
  /** Department to be displayed */
  departments: PropTypes.arrayOf(categoryItemShape),
  /** Department slug */
  parentSlug: PropTypes.string,
  /** Whether to show second level links or not */
  showSecondLevel: PropTypes.bool,
  /** Custom styles to item container */
  containerStyle: PropTypes.object,
}

export default ItemContainer
