import React, { useState } from 'react'
import { categoryItemShape } from '../propTypes'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'
import { Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'
import styles from '../categoryMenu.css'
import Department from './Department/Department'

/**
 * Component responsible dor rendering an array of categories and its respective subcategories
 */
const ItemContainer = ({ containerStyle, departments, parentSlug }) => {
  const resetInitialVariable = () => {
    return [...Array(departments.length).fill(false)]
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDepartmentHover, setDepartmentHover] = useState(resetInitialVariable)

  const closeDepartmentHandler = () => {
    const isDepartmentHovered = resetInitialVariable
    setDepartmentHover(isDepartmentHovered)
  }

  const openDepartmentHandler = index => {
    const isDepartmentHovered = isDepartmentHover.map((_, key) => {
      return key === index
    })
    setDepartmentHover(isDepartmentHovered)
  }

  const containerClasses = classNames(
    styles.submenuList,
    'w-100 flex flex-wrap pa0 list mw9 flex justify-start'
  )
  const columnItemClasses = classNames(
    styles.firstLevelList,
    'pl0 pr2 flex-row fl w-10'
  )

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
  const shouldRenderCategory = index => {
    return isDepartmentHover[index]
  }

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
        <div className={containerClasses}>
          <div className={columnItemClasses}>
            {departments.map((department, index) => (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <div
                key={index}
                className={`${styles.firstLevelLinkContainer} list pa0 grow shadow-hover`}
                onMouseLeave={closeDepartmentHandler}
                onMouseEnter={() => openDepartmentHandler(index)}
              >
                <Link
                  page={
                    parentSlug
                      ? 'store.search#category'
                      : 'store.search#department'
                  }
                  className={firstLevelLinkClasses}
                  params={getLinkParams(parentSlug, department)}
                >
                  {department.name}
                </Link>
              </div>
            ))}
          </div>
          {departments.map((department, index) => (
            <>
              {shouldRenderCategory(index) && (
                <div
                  className={'flex-column relative top-0 fl w-90 h-100'}
                  onMouseEnter={() => openDepartmentHandler(index)}
                >
                  <Department
                    key={department.name}
                    department={department}
                    parentSlug={parentSlug}
                    isDepartmentHover={isDepartmentHover}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </Container>
    </div>
  )
}

ItemContainer.propTypes = {
  departments: PropTypes.arrayOf(categoryItemShape),
  parentSlug: PropTypes.string,
  showSecondLevel: PropTypes.bool,
  containerStyle: PropTypes.object,
}

export default ItemContainer
