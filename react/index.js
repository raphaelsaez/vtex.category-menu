import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'
import { IconMenu } from 'vtex.store-icons'
import { compose } from 'ramda'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import MenuContainer from './components/MenuContainer'
import SideBar from './components/SideBar'
import { categoryPropType } from './propTypes'
import getCategories from './queries/categoriesQuery.gql'
import Options from './constants/Options'

import styles from './categoryMenu.css'

const CategoryMenu = ({
  mobileMode = false,
  showSubcategories = true,
  departments = [],
  data: { categories = [] },
  intl,
  manualDepartments = [],
  strategyTypes,
}) => {
  const [sideBarVisible, setSidebarVisible] = useState(false)
  const [isHover, setHover] = useState(false)
  const itemRef = useRef(null)

  const handleSidebarToggle = () => {
    setSidebarVisible(prevVisible => !prevVisible)
  }

  const handleCloseMenu = () => {
    setHover(!isHover)
  }

  const departmentsIds = departments.map(dept => dept.id)
  const departmentsSelected = categories.filter(category =>
    departmentsIds.includes(category.id)
  )

  let visibleDepartments =
    (departmentsSelected.length && departmentsSelected) || categories

  switch (strategyTypes) {
    case Options.BOTH:
      visibleDepartments = visibleDepartments.concat(manualDepartments)
      break
    case Options.MANUAL:
      visibleDepartments = manualDepartments
      break
  }

  const containerStyle = {
    top:
      itemRef.current &&
      itemRef.current.offsetTop + itemRef.current.clientHeight,
    display: isHover ? 'flex' : 'none',
  }

  if (mobileMode) {
    return (
      <div className={`${styles.sidebarContainer} ${styles.mobile}`}>
        <SideBar
          visible={sideBarVisible}
          title={intl.formatMessage({
            id: 'store/category-menu.departments.title',
          })}
          departments={visibleDepartments}
          onClose={handleSidebarToggle}
          showSubcategories={showSubcategories}
        />
        <div className="flex pa4 pointer" onClick={handleSidebarToggle}>
          <IconMenu size={20} />
        </div>
      </div>
    )
  }

  const desktopClasses = classNames(
    `${styles.container} w-100 bg-base dn flex-m justify-center`
  )

  return (
    <nav className={desktopClasses}>
      <Container
        className={`${styles['section--department']} justify-center flex`}
        ref={itemRef}
        onMouseEnter={() => setHover(true)}
      >
        <ul
          className={`${styles.departmentList} pa0 list ma0 flex flex-wrap flex-row t-action overflow-hidden h3`}
          onClick={handleCloseMenu}
        >
          <MenuContainer
            noRedirect
            department={{
              children: visibleDepartments,
              name: intl.formatMessage({
                id: 'store/category-menu.departments.title',
              }),
            }}
            containerStyle={containerStyle}
            isHover={isHover}
          />
        </ul>
      </Container>
    </nav>
  )
}

CategoryMenu.propTypes = {
  /** Categories query data */
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(categoryPropType),
  }),
  /** Set mobile mode */
  mobileMode: PropTypes.bool,
  showAllDepartments: PropTypes.bool,
  showSubcategories: PropTypes.bool,
  intl: intlShape,
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  manualDepartments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          slug: PropTypes.string,
          children: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              slug: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
  strategyTypes: PropTypes.string,
}

CategoryMenu.schema = {
  title: 'admin/editor.category-menu.title',
  description: 'admin/editor.category-menu.description',
  type: 'object',
  properties: {
    showAllDepartments: {
      type: 'boolean',
      title: 'admin/editor.category-menu.show-departments-category.title',
      default: true,
    },
    showSubcategories: {
      type: 'boolean',
      title: 'admin/editor.category-menu.show-subcategories.title',
      default: true,
    },
    departments: {
      title: 'store/category-menu.departments.title',
      type: 'array',
      minItems: 0,
      items: {
        title: 'admin/editor.category-menu.departments.items.title',
        type: 'object',
        properties: {
          id: {
            title: 'admin/editor.category-menu.departments.items.id',
            type: 'number',
          },
        },
      },
    },
    strategyTypes: {
      title: 'Strategy?',
      type: 'string',
      enum: ['Both', 'Manual', 'Automatic'],
    },
    manualDepartments: {
      title: 'Departments',
      type: 'array',
      items: {
        properties: {
          name: {
            type: 'string',
            title: "Department's Name",
          },
          slug: {
            type: 'string',
            title: "Department's slug",
          },
          children: {
            title: 'Category',
            type: 'array',
            items: {
              properties: {
                name: {
                  type: 'string',
                  title: "Category's Name",
                },
                slug: {
                  type: 'string',
                  title: "Category's slug",
                },
                children: {
                  type: 'array',
                  title: 'Subcategory',
                  items: {
                    properties: {
                      name: {
                        type: 'string',
                        title: "Subcategory's Name",
                      },
                      slug: {
                        type: 'string',
                        title: "Subcategory's slug",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

export default compose(
  graphql(getCategories),
  injectIntl
)(CategoryMenu)
