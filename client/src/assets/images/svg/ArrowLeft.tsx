import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const ArrowLeft: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={className}
    width='20'
    height='14'
    viewBox='0 0 20 14'
    fill='none'
  >
    <path
      d='M6.3164 0.899353L7.02248 1.60586L1.38048 7.22601L7.02315 12.8748L6.31573 13.5799L-0.0323486 7.22467L6.3164 0.899353Z'
      fill='black'
    />
    <path d='M19.9917 7.73892H0.674377V6.74103H19.9917V7.73892Z' fill='black' />
  </svg>
)
