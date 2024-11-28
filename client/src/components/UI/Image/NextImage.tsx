import React from 'react'
import Image, { ImageProps } from 'next/image'
import { imageStorage } from './imageStorage'

interface NextImageProps extends Omit<ImageProps, 'alt' | 'src'> {
  variant: keyof typeof imageStorage
}

const NextImage: React.FC<NextImageProps> = (props) => {
  const { variant } = props
  return <Image {...props} {...imageStorage[variant]} />
}

export default NextImage
