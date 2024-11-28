import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const ChevronTop: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 12 6'
    fill='none'
  >
    <path d='M1 5L6 1L11 5' stroke='black' />
  </svg>
)
