import React from 'react'
import styles from '../../categoryMenu.css'
import SubCategoryContainer from '../SubCategory/SubCategory'
import { Link } from 'vtex.render-runtime'
import classNames from 'classnames'
import categoryMenuPosition from '../../utils/categoryMenuPosition'

const Category = ({
  category,
  categoryStyle,
  parentSlug,
  params,
  menuPosition,
}) => {
  const secondLevelLinkClasses = classNames(
    styles.secondLevelLink,
    'db pv3 no-underline outline-0 tl link t-small truncate c-muted-1 underline-hover',
    {
      pr5: menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      pl5: menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
      ph5: menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
    }
  )

  return (
    <>
      <li
        key={category.name}
        className={`${styles.secondLevelLinkContainer} list pa0`}
      >
        <Link
          page={
            parentSlug ? 'store.search#subcategory' : 'store.search#category'
          }
          className={secondLevelLinkClasses}
          params={params}
        >
          <strong>{category.name}</strong>
        </Link>
      </li>
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

export default Category
