import * as React from 'react';
import styles from './index.module.scss';

// Define the Tabs enum
export enum Tabs {
  MODIFY='Modify',
  INCREASE='Increase'
};

// Define the TabsComponent props
interface TabsComponentProps {
    current: Tabs;
    setTab: (tab: Tabs) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = ({ current, setTab }) => {
  const handleClick = (tab: Tabs) => {
    setTab(tab);
  };

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
          onClick={() => handleClick(Tabs.INCREASE)}
          className={`${styles.tab} ${current === Tabs.INCREASE ? styles.active : ''}`}
        >
          Increase
        </li>
      </ul>
    </div>
  );
}

export default TabsComponent;
