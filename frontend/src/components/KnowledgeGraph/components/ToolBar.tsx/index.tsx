import * as React from 'react'
import EditButton from './EditButton'
import styles from '../../index.module.scss'
import Button from '../../../Button'
import KnowledgeGraphStore from '../../store'
import { observer } from 'mobx-react-lite'

interface ToolBarProps {
  store: KnowledgeGraphStore
}

const ToolBar: React.FC<ToolBarProps> = observer(({ store }) => {
  const handleEditOnClick = () => {
    if (store.editable) {
      store.sendDiff()
    }
    store.setEditable(!store.editable)
  }

  return (
    <div className={styles.toolbar}>
      {store.editable && store.edgeId && (
        <Button type='danger' onClick={() => store.deleteEdge(store.edgeId ?? '')}>
          Delete Edge
        </Button>
      )}
      <EditButton editable={store.editable} handleOnClick={handleEditOnClick} />
    </div>
  )
})

export default ToolBar
