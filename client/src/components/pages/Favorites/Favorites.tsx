import React from 'react'
import { useRouter } from 'next/router'
import Page from '../../Page/Page'
import ProfileLayout from '../../ProfileLayout/ProfileLayout'
import { ProductItem } from '../../../assets/models/catalog'
import FavoriteCard from '../../FavoriteCard/FavoriteCard'

import styles from './favorites.module.scss'

interface FavoritesProps {
  products: ProductItem[]
}

const Favorites: React.FC<FavoritesProps> = ({ products }) => {
  const router = useRouter()

  const breadCrumbsItem = {
    href: router.asPath,
    name: `избранное`,
  }

  return (
    <Page className={styles.FavoritePage} wrapper>
      <ProfileLayout
        title='мой лист желаний'
        breadCrumbsItems={[breadCrumbsItem]}
      >
        <div className={styles.Content}>
          {products.map((product) => (
            <FavoriteCard key={product.id} product={product} />
          ))}
        </div>
      </ProfileLayout>
    </Page>
  )
}

export default Favorites
