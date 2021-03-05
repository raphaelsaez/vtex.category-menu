import React from 'react'
import Category from '../../../Category/Category'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Department = ({
  department,
  parentSlug,
  openDepartmentHandler,
  indexDepartment,
}) => {
  const columnsDepartmentClasses = classNames(
    'flex-column relative top-0 fl w-80 h-100'
  )

  const columnItemClasses = classNames('flex-column relative top-0 fl')

  return (
    <div
      className={columnsDepartmentClasses}
      onMouseEnter={() => openDepartmentHandler(indexDepartment)}
    >
      <ul className={columnItemClasses}>
        {department.children.map(category => {
          const params = {
            department: parentSlug || department.slug,
            category: parentSlug ? department.slug : category.slug,
          }
          if (parentSlug) params.subcategory = category.slug
          return (
            <Category
              key={category.name}
              category={category}
              parentSlug={parentSlug}
              params={params}
            />
          )
        })}
      </ul>
    </div>
  )
}

Department.propTypes = {
  department: PropTypes.object,
  parentSlug: PropTypes.string,
  openDepartmentHandler: PropTypes.func,
  indexDepartment: PropTypes.number,
}

export default Department
