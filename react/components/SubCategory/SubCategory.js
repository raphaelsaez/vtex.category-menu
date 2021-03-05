import React from 'react'
import { Link } from 'vtex.render-runtime'

import PropTypes from 'prop-types'
import styles from '../../categoryMenu.css'
import Item from '../List/Item/Item'

const SubCategory = ({ subcategories, parentSlug, secondLevelLinkClasses }) => {
  const itemClasses = `${styles.secondLevelLinkContainer} list pa0`
  return (
    <>
      {subcategories.children.map(subCategory => {
        const params = {
          department: parentSlug || subcategories.slug,
          category: parentSlug ? subcategories.slug : subCategory.slug,
        }

        if (parentSlug) params.subcategory = subCategory.slug

        return (
          <Item key={subCategory.name} classes={itemClasses}>
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
          </Item>
        )
      })}
    </>
  )
}

SubCategory.propTypes = {
  subcategories: PropTypes.object,
  parentSlug: PropTypes.string,
  subCategoryStyle: PropTypes.object,
  secondLevelLinkClasses: PropTypes.string,
}

export default SubCategory
