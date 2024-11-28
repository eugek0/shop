import React, { CSSProperties, ReactNode, useState } from 'react'

import classNames from 'classnames'
import styles from './accordion.module.scss'
import Svg from '../Svg/Svg'
import IconButton from '../IconButton/IconButton'

interface AccordionItem {
  id: string
  title: ReactNode
  content: ReactNode
  disabled?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  border?: boolean
  allActive?: boolean
  requiredOpen?: boolean
  className?: string
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  border,
  allActive,
  requiredOpen,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    requiredOpen ? 0 : null,
  )

  if (!items.length) return null

  const onTitleClick = (index: number) => {
    if (index === activeIndex && !requiredOpen) {
      setActiveIndex(null)
    } else {
      setActiveIndex(index)
    }
  }

  const borderStyle: CSSProperties = !border ? { border: 'none' } : {}

  const activeStyle: CSSProperties = allActive
    ? { cursor: 'pointer', userSelect: 'none' }
    : {}

  const renderedItems = items.map(({ id, title, content, disabled }, index) => {
    const active = index === activeIndex
    return (
      <div
        style={borderStyle}
        className={classNames(styles.Item, disabled && styles.Disabled)}
        key={id}
      >
        <div
          style={activeStyle}
          className={classNames(
            styles.Title,
            active && styles.TitleActive,
            disabled && styles.DisabledTitle,
          )}
          onClick={() => allActive && onTitleClick(index)}
        >
          {title}
          <IconButton
            onClick={() => !allActive && onTitleClick(index)}
            strokePath
          >
            <Svg name={active ? 'chevron-top' : 'chevron-bottom'} />
          </IconButton>
        </div>
        <div
          className={classNames(styles.Content, active && styles.ContentActive)}
        >
          {content}
        </div>
      </div>
    )
  })

  return (
    <div
      style={borderStyle}
      className={classNames(styles.Accordion, className)}
    >
      {renderedItems}
    </div>
  )
}

Accordion.defaultProps = {
  border: true,
  allActive: false,
}

export default Accordion
