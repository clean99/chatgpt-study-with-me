import * as React from 'react'
// eslint-disable-next-line
// @ts-ignore  react-graph-vis don't have types yet.
import Graph from 'react-graph-vis'
import { Completed, Edge, Node } from '../../types/types'
import NodePanel from '../NodePanel'
import EditButton from './components/EditButton'
import { edgeToVisEdge, nodeToVisNode } from './utils'
import styles from './index.module.scss'
import { v4 as uuidv4 } from 'uuid'
import KnowledgeGraphStore from './store'
import { optionGenerator } from './graphConfig/option'
import { onDoubleClick } from './graphConfig/events'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'

interface KnowledgeGraphProps {
  data: {
    nodes: Node[]
    edges: Edge[]
  }
  width?: number
  height?: number
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = observer(({
  width = window.innerWidth,
  height = window.innerHeight,
}) => {
  const store = React.useContext(Context)

  const network = React.useRef<any>(null)
  const options = React.useMemo(() => optionGenerator(width, height, store.addEdge, store.edges), [width, height, store.edges])
  const events = {
    doubleClick: _.curryRight(onDoubleClick)(store)
  }

  React.useEffect(() => {
    if (network.current) {
      if (store.editable) {
        network.current.addEdgeMode()
      } else {
        network.current.disableEditMode()
      }
    }
  }, [network, store.editable, store.nodes, store.edges, store.nodeId])

  const graph = {
    nodes: store.nodes.map(nodeToVisNode),
    edges: store.edges.map(edgeToVisEdge),
  }

  return (
    <div>
      <Graph
        key={uuidv4()}
        graph={graph}
        options={options}
        events={events}
        getNetwork={(newNetwork: any) => {
          network.current = newNetwork
        }}
      />
      <div className={styles.toolbar}>
        <EditButton editable={store.editable} setEditable={store.setEditable} />
      </div>
      {store.nodeId && (
        <NodePanel
          x={10}
          y={10}
          nodeData={
            store.nodes.find((node) => node.id === store.nodeId) ?? {
              id: '',
              label: '',
              completed: Completed.NOT_COMPLETED,
            }
          }
          isVisible={!!store.nodeId}
          onClose={store.clearNodeId}
          onModifySubmit={store.modifyNode}
          onDelete={store.deleteNode}
          onAdd={store.addNodesWithParent}
        />
      )}
    </div>
  )
})

const Context = React.createContext<KnowledgeGraphStore>(new KnowledgeGraphStore({ nodes: [], edges: [] }))

const KnowledgeGraphWithStore: React.FC<KnowledgeGraphProps> = (props) => (
  <Context.Provider value={React.useMemo(() => new KnowledgeGraphStore({ nodes: props.data.nodes, edges: props.data.edges }),[props.data.nodes, props.data.nodes])}>
    <KnowledgeGraph {...props} />
  </Context.Provider>
)

export default KnowledgeGraphWithStore
