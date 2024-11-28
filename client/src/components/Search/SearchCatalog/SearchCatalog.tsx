import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useWindowCoordinate } from '../../../helpers/hooks/useWindowCoordinate'
import useDebounce from '../../../helpers/hooks/useDebounce'
import styles from '../Search.module.scss'
import Input from '../../UI/Input/Input'
import ProductCard from '../../ProductCard/ProductCard'
import { CatalogApi } from '../../../api/catalog.api'

const { qkGetCatalog, getCatalog } = CatalogApi

const SearchCatalog = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { windowX } = useWindowCoordinate()

  const [searchValue, setSearchValue] = useState('')

  const debouncedValue = useDebounce(searchValue, 500)

  const { data: catalog = { count: 0, rows: [] } } = useQuery(
    qkGetCatalog({ title: debouncedValue }),
    () => getCatalog({ title: debouncedValue }),
  )

  const handleChangeSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    },
    [],
  )

  const handleWheel = useCallback(
    (event: WheelEvent): void => {
      if (!containerRef.current) return
      event.preventDefault()
      containerRef.current.scrollLeft += event.deltaY
    },
    [containerRef],
  )

  useEffect(() => {
    const container = containerRef.current

    if (!container || windowX <= 990) return

    container.addEventListener('wheel', handleWheel, { passive: false })

    // eslint-disable-next-line consistent-return
    return () => {
      if (container) {
        // @ts-ignore
        container.removeEventListener('wheel', handleWheel, { passive: false })
      }
    }
  }, [containerRef, handleWheel, windowX])

  return (
    <div className={styles.Content}>
      <Input
        className={styles.Field}
        placeholder='Хочу купить'
        value={searchValue}
        onChange={handleChangeSearchValue}
      />
      <div className={styles.Catalog} ref={containerRef}>
        {catalog.rows.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default SearchCatalog
