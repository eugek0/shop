import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const YouTubeIcon: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 20 21'
    fill='none'
  >
    <path
      d='M15.7113 5.029C13.0083 4.865 6.988 4.86567 4.28875 5.029C1.366 5.20633 1.02175 6.77564 1 10.9062C1.02175 15.0295 1.363 16.6055 4.28875 16.7835C6.98875 16.9468 13.0083 16.9474 15.7113 16.7835C18.634 16.6061 18.9783 15.0368 19 10.9062C18.9783 6.78297 18.637 5.207 15.7113 5.029ZM7.75 13.6335V8.17898L13.375 10.9015L7.75 13.6335Z'
      fill='white'
    />
  </svg>
)
