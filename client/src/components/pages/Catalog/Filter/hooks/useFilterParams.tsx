import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { FilterApi } from '../../../../../api/filter.api'
import { CatalogCategory } from '../../../../../assets/models/catalog'
import RangeSlider from '../../../../UI/RangeSlider/RangeSlider'

const formatData = (data: CatalogCategory[]) =>
  data.map(({ id, title }) => ({ label: title, value: id }))

const findParamName = ({
  paramId,
  array,
}: {
  paramId?: string | string[]
  array: CatalogCategory[]
}) => {
  if (!paramId) return null
  return array.find(({ id }) => id === paramId)?.title
}

export const useFilterParams = () => {
  const router = useRouter()

  const {
    qkGetGenders,
    qkGetColors,
    qkGetTypes,
    qkGetMotives,
    qkGetOrders,
    qkGetVolumes,
    qkGetPrices,
    getGenders,
    getMotives,
    getTypes,
    getVolumes,
    getOrders,
    getColors,
    getPrices,
  } = FilterApi

  const { data: genders = [] } = useQuery(qkGetGenders, getGenders)
  const { data: colors = [] } = useQuery(qkGetColors, getColors)
  const { data: types = [] } = useQuery(qkGetTypes, getTypes)
  const { data: motives = [] } = useQuery(qkGetMotives, getMotives)
  const { data: orders = [] } = useQuery(qkGetOrders, getOrders)
  const { data: volumes = [] } = useQuery(qkGetVolumes, getVolumes)
  const { data: { min, max } = { min: 0, max: 0 } } = useQuery(
    qkGetPrices,
    getPrices,
  )

  const {
    order,
    volumeId,
    typeId,
    genderId,
    motiveId,
    colorId,
    minPrice,
    maxPrice,
  } = router.query

  const handleClearValue = useCallback(
    (key?: string) => {
      if (!key) return
      const {
        pathname,
        query: { [key]: data, ...rest },
      } = router
      router.push({ pathname, query: rest })
    },
    [router],
  )

  const selectParams = useCallback(
    (key: string, value: string | string[] | number) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [key]: value },
        },
        undefined,
        { scroll: false },
      )
    },
    [router],
  )

  const handleClearPrice = useCallback(() => {
    const {
      pathname,
      query: { minPrice: minimal, maxPrice: maximum, ...rest },
    } = router
    if (!minimal || !maximum) return
    router.push({ pathname, query: rest })
  }, [router])

  const selectPrice = useCallback(
    (value: number | number[]) => {
      const [minimal, maximum] = value as number[]

      if (minimal === Number(minPrice) && maximum === Number(maxPrice)) return

      if (minimal === min && maximum === max) {
        handleClearPrice()
      } else {
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, minPrice: minimal, maxPrice: maximum },
          },
          undefined,
          { scroll: false },
        )
      }
    },
    [router, min, max, minPrice, maxPrice],
  )

  const priceSelected = useMemo(
    () =>
      !!minPrice &&
      !!Number(maxPrice) &&
      (min !== Number(minPrice) || max !== Number(maxPrice)),
    [min, max, minPrice, maxPrice],
  )

  const filter = useMemo(
    () => [
      {
        label:
          findParamName({ paramId: order, array: orders }) || 'сортировать',
        key: 'order',
        value: formatData(orders),
        selected: !!order,
        onClearValue: handleClearValue,
      },
      {
        label: priceSelected ? `${minPrice} - ${maxPrice} ₽` : 'цена',
        key: 'price',
        children: (
          <RangeSlider
            key={`${min}-${max}`}
            min={min}
            max={max}
            defaultValue={
              minPrice && maxPrice
                ? [Number(minPrice), Number(maxPrice)]
                : undefined
            }
            onChangeCommitted={selectPrice}
          />
        ),
        selected: priceSelected,
        onClearValue: handleClearPrice,
      },
      {
        label: findParamName({ paramId: volumeId, array: volumes }) || 'объем',
        key: 'volumeId',
        value: formatData(volumes),
        selected: !!volumeId,
        onClearValue: handleClearValue,
      },
      {
        label:
          findParamName({ paramId: typeId, array: types }) || 'тип аромата',
        key: 'typeId',
        value: formatData(types),
        selected: !!typeId,
        onClearValue: handleClearValue,
      },
      {
        label:
          findParamName({ paramId: genderId, array: genders }) || 'для кого',
        key: 'genderId',
        value: formatData(genders),
        selected: !!genderId,
        onClearValue: handleClearValue,
      },
      {
        label:
          findParamName({ paramId: motiveId, array: motives }) || 'по мотивам',
        key: 'motiveId',
        value: formatData(motives),
        selected: !!motiveId,
        onClearValue: handleClearValue,
      },
      {
        label:
          findParamName({ paramId: colorId, array: colors }) ||
          'цвет коллекции',
        key: 'colorId',
        value: formatData(colors),
        selected: !!colorId,
        onClearValue: handleClearValue,
      },
    ],
    [
      genderId,
      colorId,
      typeId,
      motiveId,
      order,
      volumeId,
      genders,
      colors,
      types,
      motives,
      orders,
      volumes,
      router,
      min,
      max,
      minPrice,
      maxPrice,
      priceSelected,
    ],
  )

  return { filter, selectParams }
}
