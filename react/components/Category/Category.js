import React from 'react'
import styles from '../../categoryMenu.css'
import SubCategoryContainer from '../SubCategory/SubCategory'
import { Link } from 'vtex.render-runtime'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Item from '../List/Item/Item'

const Category = ({ category, parentSlug, params }) => {
  const secondLevelLinkClasses = classNames(
    styles.secondLevelLink,
    'db pv3 no-underline outline-0 tl link t-small truncate c-muted-1 underline-hover ph5'
  )

  const itemClasses = `${styles.secondLevelLinkContainer} list pa0`

  return (
    <>
      <Item key={category.name} classes={itemClasses}>
        <Link
          page={
            parentSlug ? 'store.search#subcategory' : 'store.search#category'
          }
          className={secondLevelLinkClasses}
          params={params}
        >
          <strong>{category.name}</strong>
        </Link>
      </Item>
      {category.children && (
        <SubCategoryContainer
          subcategories={category}
          parentSlug={category.slug}
          secondLevelLinkClasses={secondLevelLinkClasses}
          params={params}
        />
      )}
    </>
  )
}

Category.propTypes = {
  category: PropTypes.object,
  parentSlug: PropTypes.string,
  params: PropTypes.object,
}

export default Category
