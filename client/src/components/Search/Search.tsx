import React from 'react'
import Drawer from '../UI/Drawer/Drawer'
import SearchCatalog from './SearchCatalog/SearchCatalog'

import styles from './Search.module.scss'

interface SearchProps {
  isOpened: boolean
  setIsOpened?: () => void
  hideClose?: boolean
  position?: 'top' | 'left' | 'right' | 'bottom'
}

const Search: React.FC<SearchProps> = ({
  isOpened,
  setIsOpened,
  hideClose,
  position,
}) => (
  <Drawer
    className={styles.Search}
    isOpened={isOpened}
    setIsOpened={setIsOpened}
    title=''
    position={position}
    hideClose={hideClose}
  >
    <SearchCatalog />
  </Drawer>
)

Search.defaultProps = {
  position: 'top',
}

export default Search
