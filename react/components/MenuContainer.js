import React from 'react'
import { Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'
import { categoryItemShape } from '../propTypes'

import DepartmentsContainer from './DepartmentsContainer/DepartmentsContainer'
import classNames from 'classnames'
import styles from '../categoryMenu.css'

const MenuContainer = ({
  department,
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
      {department.children.length > 0 && (
        <DepartmentsContainer
          containerStyle={containerStyle}
          departments={department.children}
          parentSlug={department.slug}
        />
      )}
    </li>
  )
}

MenuContainer.propTypes = {
  department: categoryItemShape.isRequired,
  noRedirect: PropTypes.bool,
  isCategorySelected: PropTypes.bool,
  containerStyle: PropTypes.object,
  isHover: PropTypes.bool,
}

export default MenuContainer
