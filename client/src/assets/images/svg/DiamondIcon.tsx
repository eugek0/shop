import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const DiamondIcon: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={className}
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
  >
    <g clipPath='url(#clip0_189_59)'>
      <path
        d='M20 39.685C30.7005 39.685 39.375 31.0105 39.375 20.31C39.375 9.60948 30.7005 0.934998 20 0.934998C9.29948 0.934998 0.625 9.60948 0.625 20.31C0.625 31.0105 9.29948 39.685 20 39.685Z'
        stroke='black'
        strokeWidth='1.25'
      />
      <path
        d='M11.8096 18.5899L15.4225 14.26H24.5778L28.1907 18.5899L20.0001 28.2572L11.8096 18.5899Z'
        stroke='black'
        strokeWidth='0.9'
      />
      <path d='M12.0186 18.9898H27.9794' stroke='black' strokeWidth='0.9' />
      <path
        d='M15.2109 14.6049L16.807 18.59L19.9992 14.6049L23.1914 18.59L24.7874 14.6049'
        stroke='black'
        strokeWidth='0.9'
        strokeLinejoin='bevel'
      />
      <path
        d='M20.0056 28.1593L19.5807 28.3073H20.4306L20.0056 28.1593ZM16.3885 19.1416L19.5807 28.3073L20.4306 28.0113L17.2384 18.8456L16.3885 19.1416ZM20.4306 28.3073L23.6228 19.1416L22.7728 18.8456L19.5807 28.0113L20.4306 28.3073Z'
        fill='black'
      />
    </g>
    <defs>
      <clipPath id='clip0_189_59'>
        <rect
          width='40'
          height='40'
          fill='white'
          transform='translate(0 0.309998)'
        />
      </clipPath>
    </defs>
  </svg>
)
