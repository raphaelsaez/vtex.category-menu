import React from 'react'
import { Link } from 'vtex.render-runtime'

import PropTypes from 'prop-types'
import styles from '../../categoryMenu.css'
import { categoryItemShape } from '../../propTypes'

const SubCategory = ({ subcategories, parentSlug, secondLevelLinkClasses }) => {
  return (
    <>
      {subcategories.children.map(subCategory => {
        const params = {
          department: parentSlug || subcategories.slug,
          category: parentSlug ? subcategories.slug : subCategory.slug,
        }
        // eslint-disable-next-line react/prop-types
        if (parentSlug) params.subcategory = subCategory.slug

        return (
          <li
            key={subCategory.name}
            className={`${styles.secondLevelLinkContainer} list pa0`}
          >
            <Link
              page={
                parentSlug
                  ? 'store.search#subcategory'
                  : 'store.search#category'
              }
              className={secondLevelLinkClasses}
              params={params}
            >
              {subCategory.name}
            </Link>
          </li>
        )
      })}
    </>
  )
}

SubCategory.propTypes = {
  /** SubCategories to be displayed */
  subcategories: PropTypes.object,
  /** Category slug */
  parentSlug: PropTypes.string,
  /** Hidden Style SubCategory */
  subCategoryStyle: PropTypes.object,
  /** Second Level Classes */
  secondLevelLinkClasses: PropTypes.string,
}

export default SubCategory
