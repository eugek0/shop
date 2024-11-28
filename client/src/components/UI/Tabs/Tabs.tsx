import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './tabs.module.scss'

interface Tab {
  title: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  className?: string
  position?: 'left' | 'center'
}

const Tabs: React.FC<TabsProps> = ({ tabs, className, position }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const activeTabRef = useRef<HTMLButtonElement>(null)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  useEffect(() => {
    const activeTabEl = activeTabRef.current

    if (!activeTabEl) return

    const left = activeTabEl.offsetLeft
    const width = activeTabEl.offsetWidth
    setIndicatorStyle({ left, width })
  }, [activeTab])

  return (
    <div className={classNames(styles.Container, className)}>
      <div className={styles.Header} style={{ justifyContent: position }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.title}
            ref={index === activeTab ? activeTabRef : null}
            type='button'
            onClick={() => handleTabClick(index)}
            className={classNames(
              styles.TabButton,
              index === activeTab && styles.ActiveTab,
            )}
          >
            {tab.title}
          </button>
        ))}
        <div className={styles.ActiveTabIndicator} style={indicatorStyle} />
      </div>
      <div className={styles.Content}>{tabs[activeTab].content}</div>
    </div>
  )
}

Tabs.defaultProps = {
  position: 'left',
}

export default Tabs
