import { EChartsCoreOption } from 'echarts/core'

interface initialChartOptionsArgs {
  dates: string[]
  prices: number[]
  minPrice?: number
  maxPrice?: number
}

export const initialChartOptions = ({
  dates,
  prices,
  minPrice,
  maxPrice,
}: initialChartOptionsArgs): EChartsCoreOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    height: 400,
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: dates,
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: minPrice || 0,
      max: maxPrice || 0,
    },
  ],
  series: [
    {
      type: 'line',
      smooth: true,
      color: '#ac8c75',
      data: prices,
    },
  ],
})
