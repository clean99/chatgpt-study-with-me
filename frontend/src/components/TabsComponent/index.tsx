import * as React from 'react'
import styles from './index.module.scss'

// Define the Tabs enum
export enum Tabs {
  MODIFY,
  NEW_NODES,
}

// Define the TabsComponent props
interface TabsComponentProps {
  current: Tabs
  setTab: (tab: Tabs) => void
}

const TabsComponent: React.FC<TabsComponentProps> = ({ current, setTab }) => {
  const handleClick = (tab: Tabs) => {
    setTab(tab)
  }

  return (
    <div className={styles.tabs}>
      <ul className={styles.tabList}>
        <li
          onClick={() => handleClick(Tabs.MODIFY)}
          className={`${styles.tab} ${current === Tabs.MODIFY ? styles.active : ''}`}
        >
          Modify
        </li>
        <li
          onClick={() => handleClick(Tabs.NEW_NODES)}
          className={`${styles.tab} ${current === Tabs.NEW_NODES ? styles.active : ''}`}
        >
          New Nodes
        </li>
      </ul>
    </div>
  )
}

export default TabsComponent
