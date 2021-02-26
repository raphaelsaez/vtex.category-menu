import React, { useRef, useState } from 'react'
import styles from '../../categoryMenu.css'
import Category from '../Category/Category'
import classNames from 'classnames'
import categoryMenuPosition from '../../utils/categoryMenuPosition'
import { Link } from 'vtex.render-runtime'

const Department = ({ department, menuPosition, parentSlug }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDepartmentHover, setDepartmentHover] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemDepartmentRef = useRef(null)
  const closeDepartmentHandler = () => {
    setDepartmentHover(false)
  }
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

  const columnItemClasses = classNames(styles.firstLevelList, {
    'pl0 pr7 flex-row':
      menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
    'pr0 pl7 flex-row':
      menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
  })

  const firstLevelLinkClasses = classNames(
    styles.firstLevelLink,
    'db pv4 link no-underline outline-0 tl t-small truncate c-on-base underline-hover',
    {
      pr4: menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      pl4: menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
      ph4: menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
    }
  )

  const categoryStyle = {
    top: 0,
    left:
      itemDepartmentRef.current &&
      itemDepartmentRef.current.clientLeft +
        itemDepartmentRef.current.offsetLeft +
        100,
    display: isDepartmentHover ? 'flex' : 'none',
    position: 'relative',
  }

  return (
    <ul className={columnItemClasses} ref={itemDepartmentRef}>
      <li
        className={`${styles.firstLevelLinkContainer} list pa0`}
        onMouseEnter={() => setDepartmentHover(true)}
        onMouseLeave={closeDepartmentHandler}
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
      </li>
      <ul style={categoryStyle} className={'flex-column'}>
        {shouldRenderSecondLevel(department) &&
          department.children.map(category => {
            const params = {
              department: parentSlug || department.slug,
              category: parentSlug ? department.slug : category.slug,
            }
            if (parentSlug) params.subcategory = category.slug
            return (
              // eslint-disable-next-line react/jsx-key
              <Category
                category={category}
                categoryStyle={categoryStyle}
                menuPosition={menuPosition}
                parentSlug={parentSlug}
                params={params}
              />
            )
          })}
      </ul>
    </ul>
  )
}

export default Department
