import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const BurgerIcon: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={className}
    width='20'
    height='18'
    viewBox='0 0 20 18'
    fill='none'
  >
    <line y1='1.25' x2='20' y2='1.25' stroke='black' strokeWidth='1.5' />
    <line y1='9.25' x2='20' y2='9.25' stroke='black' strokeWidth='1.5' />
    <line y1='17.25' x2='20' y2='17.25' stroke='black' strokeWidth='1.5' />
  </svg>
)
