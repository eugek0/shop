import React, { useEffect, useMemo, useRef } from 'react'
import * as echarts from 'echarts'
import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { initialChartOptions } from './options'

import styles from './priceDynamicChart.module.scss'
import { HistoryPoint } from '../../../../assets/models/catalog'

interface PriceDynamicsChartProps {
  history: HistoryPoint[]
}

const PriceDynamicsChart: React.FC<PriceDynamicsChartProps> = ({ history }) => {
  const chartRef = useRef(null)

  const { prices, dates } = useMemo(
    () =>
      history.reduce(
        (acc, curr): { prices: number[]; dates: string[] } => ({
          prices: [...acc.prices, curr.value] as number[],
          dates: [
            ...acc.dates,
            format(new Date(curr.createdAt), 'dd MMMM', { locale: ruLocale }),
          ] as string[],
        }),
        { prices: [] as number[], dates: [] as string[] },
      ),
    [history],
  )

  const { topPrice, middlePrice, lowPrice } = useMemo(() => {
    const top = Math.max(...prices)
    const low = Math.min(...prices)
    const sumPrices = prices.reduce((acc, curr) => acc + Number(curr), 0)
    const middle = Math.round(sumPrices / prices.length)

    return { topPrice: top, middlePrice: middle, lowPrice: low }
  }, [])

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const minPrice = Math.floor((lowPrice - lowPrice / 10) / 100) * 100
    const maxPrice = Math.ceil((topPrice + topPrice / 10) / 100) * 100

    const initialOptions = initialChartOptions({
      prices,
      dates,
      minPrice,
      maxPrice,
    })

    chart.setOption(initialOptions)

    // eslint-disable-next-line consistent-return
    return () => {
      chart.dispose()
    }
  }, [prices, dates])

  return (
    <div className={styles.PriceDynamicsChart}>
      <span className={styles.Title}>динамика цены</span>
      <div className={styles.Container}>
        <div ref={chartRef} className={styles.Chart} />
        <div className={styles.PriceBox}>
          <span className={styles.MiddlePrice}>средняя цена</span>
          <span className={styles.MiddlePriceNumber}>{middlePrice} ₽</span>
          <span className={styles.MinAndMaxPrices}>
            {lowPrice} ₽ - {topPrice} ₽
          </span>
        </div>
      </div>
    </div>
  )
}

export default PriceDynamicsChart
