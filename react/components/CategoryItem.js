import React from 'react'
import { Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'
import { categoryItemShape } from '../propTypes'

import ItemContainer from './ItemContainer'
import classNames from 'classnames'
import styles from '../categoryMenu.css'

/**
 * Component that represents a single category displayed in the menu, also displays
 * the subcategories, if the provided category has them
 */
const CategoryItem = ({
  department,
  subcategoryLevels,
  department: { name, slug },
  noRedirect,
  isCategorySelected,
  containerStyle,
  isHover,
}) => {
  const categoryClasses = classNames(
    styles.departmentLink,
    'w-100 pv5 no-underline t-small outline-0 db tc link truncate bb bw1 c-muted-1 pointer mh6',
    {
      'b--transparent': !isHover && !isCategorySelected,
      'b--action-primary': isHover || isCategorySelected,
    }
  )

  return (
    <li
      className={`${styles.itemContainer} ${
        styles['itemContainer--department']
      } flex items-center db list`}
    >
      {noRedirect ? (
        <span className={categoryClasses}>{name}</span>
      ) : (
        <Link
          page="store.search#department"
          params={{ department: slug }}
          className={categoryClasses}
        >
          {name}
        </Link>
      )}
      {subcategoryLevels > 0 && department.children.length > 0 && (
        <ItemContainer
          containerStyle={containerStyle}
          departments={department.children}
          parentSlug={department.slug}
          showSecondLevel={subcategoryLevels === 2}
        />
      )}
    </li>
  )
}

CategoryItem.propTypes = {
  /** Department to be displayed */
  department: categoryItemShape.isRequired,
  /** Set use of Link component */
  noRedirect: PropTypes.bool,
  /** Number of subcategory levels */
  subcategoryLevels: PropTypes.oneOf([0, 1, 2]),
  /** Menu category selection */
  isCategorySelected: PropTypes.bool,
  /** Container Styles */
  containerStyle: PropTypes.object,
  /** Show or Hide Container */
  isHover: PropTypes.bool,
}

export default CategoryItem
