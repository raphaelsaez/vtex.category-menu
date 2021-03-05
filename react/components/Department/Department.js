import React, { useRef, useState } from 'react'
import styles from '../../categoryMenu.css'
import Category from '../Category/Category'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'

const Department = ({ department, parentSlug, containerRef }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDepartmentHover, setDepartmentHover] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemDepartmentRef = useRef(null)
  const closeDepartmentHandler = () => {
    setDepartmentHover(false)
  }
  const containerDivHeightHandler = containerRef => {
    containerRef.current.style.height = containerRef.current.scrollHeight + 'px'
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
    'pl0 pr7 flex-row'
  )

  const firstLevelLinkClasses = classNames(
    styles.firstLevelLink,
    'db pv4 link no-underline outline-0 tl t-small truncate c-on-base underline-hover ph5'
  )

  return (
    <ul
      className={columnItemClasses}
      ref={itemDepartmentRef}
      onMouseLeave={() => {
        //containerDivHeightHandler(containerRef)
        closeDepartmentHandler(containerRef)
      }}
      onMouseEnter={() => {
        //containerDivHeightHandler(containerRef)
        setDepartmentHover(true)
      }}
    >
      <li className={`${styles.firstLevelLinkContainer} list pa0 fl w-15`}>
        <Link
          page={
            parentSlug ? 'store.search#category' : 'store.search#department'
          }
          className={firstLevelLinkClasses}
          params={getLinkParams(parentSlug, department)}
        >
          {department.name}
        </Link>
      </li>
      <ul
        className={'flex-column fl w-25 absolute left-1 top-0'}
        style={{ left: '12em' }}
      >
        {isDepartmentHover ? (
          department.children.map(category => {
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
          })
        ) : (
          <></>
        )}
      </ul>
    </ul>
  )
}

Department.propTypes = {
  department: PropTypes.object,
  parentSlug: PropTypes.string,
  containerRef: PropTypes.object,
}

export default Department
