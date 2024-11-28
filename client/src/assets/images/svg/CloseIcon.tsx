import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const CloseIcon: React.FC<SvgProps> = ({ className }) => (
  <svg className={className} width='24' height='24' viewBox='0 0 24 24'>
    <line x1='3' y1='3' x2='21' y2='21' stroke='black' strokeWidth='1' />
    <line x1='3' y1='21' x2='21' y2='3' stroke='black' strokeWidth='1' />
  </svg>
)
