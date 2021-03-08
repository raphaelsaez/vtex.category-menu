import React, { Fragment, useState } from 'react'
import { categoryItemShape } from '../../propTypes'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'
import PropTypes from 'prop-types'
import styles from '../../categoryMenu.css'
import Department from './Departments/Department/Department'
import Departments from './Departments/Departments'

const DepartmentsContainer = ({ containerStyle, departments, parentSlug }) => {
  const resetInitialVariable = () => {
    return [...Array(departments.length).fill(false)]
  }

  const [isDepartmentHover, setDepartmentHover] = useState(resetInitialVariable)

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
  const columnDepartmentsClasses = classNames(
    styles.firstLevelList,
    'pl0 pr2 flex-row fl w-20'
  )

  const shouldRenderDepartment = index => {
    return isDepartmentHover[index]
  }

  const hasDepartmentChildrenLevel = department => {
    const { children } = department

    return children && children.length > 0
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
        <Container className={containerClasses}>
          <div className={columnDepartmentsClasses}>
            <Departments
              isDepartmentHover={isDepartmentHover}
              setDepartmentHover={setDepartmentHover}
              departments={departments}
              parentSlug={parentSlug}
            />
          </div>
          {departments.map((department, index) => (
            <Fragment key={department.name}>
              {shouldRenderDepartment(index) &&
                hasDepartmentChildrenLevel(department) && (
                  <Department
                    department={department}
                    parentSlug={parentSlug}
                    openDepartmentHandler={openDepartmentHandler}
                    indexDepartment={index}
                  />
                )}
            </Fragment>
          ))}
        </Container>
      </Container>
    </div>
  )
}

DepartmentsContainer.propTypes = {
  departments: PropTypes.arrayOf(categoryItemShape),
  parentSlug: PropTypes.string,
  showSecondLevel: PropTypes.bool,
  containerStyle: PropTypes.object,
}

export default DepartmentsContainer
