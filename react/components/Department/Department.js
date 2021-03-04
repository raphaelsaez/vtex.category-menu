import React, { useRef, useState } from 'react'
import styles from '../../categoryMenu.css'
import Category from '../Category/Category'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'

const Department = ({ department, parentSlug, isDepartmentHover }) => {
  const shouldRenderSecondLevel = department => {
    const { children } = department

    return children && children.length > 0
  }
  const getLinkParams = (parentSlug, item) => {
    const params = {
      department: parentSlug || item.slug,
    }

    if (parentSlug) params.category = item.slug

    return params
  }

  const columnItemClasses = classNames(
    styles.firstLevelList,
    'pl0 pr2 flex-row fl w-10'
  )

  const firstLevelLinkClasses = classNames(
    styles.firstLevelLink,
    'db pv4 link no-underline outline-0 tl t-small truncate c-on-base underline-hover ph5'
  )

  const categoryStyle = {
    display: isDepartmentHover ? 'flex' : 'none',
  }

  return (
    <>
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
                //categoryStyle={categoryStyle}
                parentSlug={parentSlug}
                params={params}
              />
            )
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  )
}

Department.propTypes = {
  department: PropTypes.object,
  parentSlug: PropTypes.string,
}

export default Department
