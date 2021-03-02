import React, { useRef, useState } from 'react'
import { categoryItemShape } from '../propTypes'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import PropTypes from 'prop-types'
import styles from '../categoryMenu.css'
import categoryMenuPosition, {
  getMenuPositionValues,
} from '../utils/categoryMenuPosition'
import Department from './Department/Department'

/**
 * Component responsible dor rendering an array of categories and its respective subcategories
 */
const ItemContainer = ({
  containerStyle,
  departments,
  parentSlug,
  menuPosition,
}) => {
  const containerClasses = classNames(
    styles.submenuList,
    'w-100 flex flex-wrap pa0 list mw9 flex-column',
    {
      'justify-start': menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      'justify-end': menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
      'justify-center':
        menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
    }
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
                menuPosition={menuPosition}
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
  /** Close menu callback */
  onCloseMenu: PropTypes.func.isRequired,
  /** Whether to show second level links or not */
  showSecondLevel: PropTypes.bool,
  /** Defines the position of the category menu */
  menuPosition: PropTypes.oneOf(getMenuPositionValues()),
  /** Custom styles to item container */
  containerStyle: PropTypes.object,
}

export default ItemContainer
