import React from 'react'
import Category from '../Category/Category'
import PropTypes from 'prop-types'

const DepartmentChildren = ({ department, parentSlug, isDepartmentHover }) => {
  return (
    <div className={'flex-column relative top-0 fl w-90'}>
      {isDepartmentHover ? (
        <ul className={'flex-column relative top-0 fl w-90'}>
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
      ) : (
        <></>
      )}
    </div>
  )
}

DepartmentChildren.propTypes = {
  department: PropTypes.object,
  parentSlug: PropTypes.string,
  isDepartmentHover: PropTypes.bool,
}

export default DepartmentChildren
