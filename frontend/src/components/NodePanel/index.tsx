import React from 'react'
import { Node } from '../../types/types'
import styles from './index.module.scss'
import { Typography } from 'antd'
import ModifyNodeForm from './components/ModifyNodeForm'
import TabsComponent, { Tabs } from '../TabsComponent'
import GenerateNodeForm from './components/GenerateNodeForm'
import ThemeProvider from '../ThemeProvider'

const { Title } = Typography

export interface NodePanelProps {
  x: number
  y: number
  width?: number
  height?: number
  nodeData: Node
  isVisible: boolean
  onClose: () => void
  onModifySubmit: (values: Node) => void
  onAdd: (nodeId: string, titles: string[]) => void
  onDelete: (nodeId: string) => void
}

const NodePanel: React.FC<NodePanelProps> = ({
  x,
  y,
  width = 360,
  height,
  nodeData,
  isVisible,
  onClose,
  onModifySubmit,
  onDelete,
  onAdd,
}) => {
  const [tab, setTab] = React.useState<Tabs>(Tabs.MODIFY)
  const handleOnAdd = (titles: string[]) => {
    onAdd(nodeData.id, titles)
  }

  const renderForm = () => {
    switch (tab) {
      case Tabs.MODIFY:
        return <ModifyNodeForm onDelete={onDelete} onSubmit={onModifySubmit} nodeData={nodeData} />
      case Tabs.NEW_NODES:
        return <GenerateNodeForm onSubmit={handleOnAdd} nodeId={nodeData.id} />
      default:
        return <ModifyNodeForm onDelete={onDelete} onSubmit={onModifySubmit} nodeData={nodeData} />
    }
  }

  React.useEffect(() => {
    if (isVisible) {
      setTab(Tabs.MODIFY)
    }
  }, [isVisible, nodeData.id])

  return (
    <ThemeProvider>
      <div
        className={`${styles.nodePanel}${isVisible ? ` ${styles.visible}` : ''}`}
        style={{ top: y, left: x, width, height }}
      >
        <div className={styles.panelHeader}>
          <Title level={5} className={styles.title}>
            Node Panel
          </Title>
          <span className={styles.cancelIcon} onClick={onClose} role={'button'}>
            &times;
          </span>
        </div>
        <TabsComponent current={tab} setTab={setTab} />
        {renderForm()}
      </div>
    </ThemeProvider>
  )
}

export default NodePanel
