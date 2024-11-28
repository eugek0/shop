import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const ArrowRight: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={className}
    width='20'
    height='14'
    viewBox='0 0 20 14'
    fill='none'
  >
    <path
      d='M13.6836 13.5806L12.9775 12.8741L18.6195 7.25398L12.9769 1.60523L13.6843 0.900047L20.0323 7.25531L13.6836 13.5806Z'
      fill='black'
    />
    <path
      d='M0.00826645 6.74106L19.3256 6.74106V7.73895L0.00826645 7.73895V6.74106Z'
      fill='black'
    />
  </svg>
)
