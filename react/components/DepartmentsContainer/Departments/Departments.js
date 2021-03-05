import React from 'react'
import styles from '../../../categoryMenu.css'
import { Link } from 'vtex.render-runtime'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Departments = ({
  departments,
  parentSlug,
  isDepartmentHover,
  setDepartmentHover,
}) => {
  const resetInitialVariable = () => {
    return [...Array(departments.length).fill(false)]
  }

  const closeDepartmentHandler = () => {
    setDepartmentHover(resetInitialVariable)
  }

  const openDepartmentHandler = index => {
    const isDepartmentHovered = isDepartmentHover.map((_, key) => {
      return key === index
    })
    setDepartmentHover(isDepartmentHovered)
  }

  const firstLevelLinkClasses = classNames(
    styles.firstLevelLink,
    'db pv4 link no-underline outline-0 tl t-small truncate c-on-base underline-hover ph5 hover-rebel-pink'
  )

  const getLinkParams = (parentSlug, item) => {
    const params = {
      department: parentSlug || item.slug,
    }

    if (parentSlug) params.category = item.slug

    return params
  }

  return (
    <>
      {departments.map((department, index) => (
        <div
          key={index}
          className={`${styles.firstLevelLinkContainer} list pa0 grow shadow-hover`}
          onMouseLeave={closeDepartmentHandler}
          onMouseEnter={() => openDepartmentHandler(index)}
        >
          <Link
            page={
              parentSlug ? 'store.search#category' : 'store.search#department'
            }
            className={firstLevelLinkClasses}
            params={getLinkParams(parentSlug, department)}
          >
            {department.name}
          </Link>
        </div>
      ))}
    </>
  )
}

export default Departments

Departments.propTypes = {
  departments: PropTypes.array,
  parentSlug: PropTypes.string,
  setDepartmentHover: PropTypes.func,
  isDepartmentHover: PropTypes.array,
}
