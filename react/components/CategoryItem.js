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
  department: categoryItemShape.isRequired,
  noRedirect: PropTypes.bool,
  subcategoryLevels: PropTypes.oneOf([0, 1, 2]),
  isCategorySelected: PropTypes.bool,
  containerStyle: PropTypes.object,
  isHover: PropTypes.bool,
}

export default CategoryItem
