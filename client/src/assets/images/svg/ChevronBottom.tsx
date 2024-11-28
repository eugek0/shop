import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const ChevronBottom: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 12 6'
    fill='none'
  >
    <path d='M11 1L6 5L1 1' stroke='black' />
  </svg>
)
