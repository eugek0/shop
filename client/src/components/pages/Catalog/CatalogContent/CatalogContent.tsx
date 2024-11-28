import React, { useEffect, useState } from 'react'
import { ProductItem } from '../../../../assets/models/catalog'

import styles from '../catalog.module.scss'
import ProductCard from '../../../ProductCard/ProductCard'

interface CatalogContentProps {
  products: ProductItem[][]
}

const CatalogContent: React.FC<CatalogContentProps> = ({ products }) => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  return (
    <div className={styles.Catalog}>
      <div className={styles.Content}>
        {products.map((row: ProductItem[], index: number) => (
          <div key={JSON.stringify(row)} className={styles.RowItems}>
            {screenWidth >= 792 ? (
              <>
                {!!row[4] && index % 2 && screenWidth >= 1704 ? (
                  <ProductCard product={row[4]} variant='large' />
                ) : null}
                <div className={styles.Group}>
                  {row.slice(0, 4).map((product: ProductItem) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {(!(index % 2) || screenWidth < 1704) && !!row[4] ? (
                  <ProductCard product={row[4]} variant='large' />
                ) : null}
              </>
            ) : (
              <div className={styles.Group}>
                {row.map((product: ProductItem) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatalogContent
