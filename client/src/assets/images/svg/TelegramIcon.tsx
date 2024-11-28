import React from 'react'
import { SvgProps } from '../../models/svg.model'

export const TelegramIcon: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 23 24'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.788 18.7407C15.0295 18.9117 15.3407 18.9544 15.6182 18.8494C15.8957 18.7437 16.0997 18.5067 16.1612 18.2194C16.8129 15.1564 18.3939 7.40362 18.9871 4.61736C19.0321 4.40736 18.9571 4.18911 18.7921 4.04886C18.6271 3.90861 18.3984 3.86811 18.1944 3.94386C15.0497 5.10786 5.3652 8.74162 1.40679 10.2064C1.15555 10.2994 0.992047 10.5409 1.0003 10.8056C1.0093 11.0712 1.18779 11.3014 1.44504 11.3787C3.22025 11.9097 5.55045 12.6484 5.55045 12.6484C5.55045 12.6484 6.63942 15.9372 7.20716 17.6097C7.27841 17.8197 7.44265 17.9847 7.6594 18.0417C7.87539 18.0979 8.10639 18.0387 8.26763 17.8864C9.17961 17.0254 10.5896 15.6942 10.5896 15.6942C10.5896 15.6942 13.2685 17.6584 14.788 18.7407ZM6.53067 12.2329L7.78989 16.3864L8.06964 13.7562C8.06964 13.7562 12.9348 9.36787 15.7082 6.86661C15.7892 6.79311 15.8005 6.67011 15.733 6.58386C15.6662 6.49761 15.5432 6.47736 15.451 6.53586C12.2365 8.58862 6.53067 12.2329 6.53067 12.2329Z'
      fill='white'
    />
  </svg>
)
