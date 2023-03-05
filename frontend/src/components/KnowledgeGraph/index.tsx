import * as React from 'react'
import { Network } from 'vis-network'
import { DataSet } from 'vis-data/peer/esm/vis-data'
import { Edge, Node } from '../../types/types'
import NodePanel from '../NodePanel'
import { eventEmit } from './events'

const COMPLETED_COLOR = '#ff4d4f'
const DEFAULT_COLOR = '#d9d9d9'

interface KnowledgeGraphProps {
  data: {
    nodes: Node[]
    edges: Edge[]
  }
  width?: number
  height?: number
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  data,
  width = window.innerWidth,
  height = window.innerHeight,
}) => {
  const { nodes, edges } = data
  const [nodeId, setNodeId] = React.useState<string | null>(null)
  const [nodePanelXY, setNodePanelXY] = React.useState<{ x: number; y: number } | null>(null)
  const nodeDataSet = new DataSet(nodes.map((node) => {
    return {
      id: node.id,
      label: node.label,
      color: node.completed ? COMPLETED_COLOR : DEFAULT_COLOR,
    }
  }))

  const edgeDataSet =  new DataSet(edges.map((edge) => {
    return {
      id: edge.id,
      from: edge.from,
      to: edge.to,
      arrows: 'to',
    }
  }))

  const graphData = {
    nodes: nodeDataSet,
    edges: edgeDataSet,
  }

  const options = {
    width: `${width}px`,
    height: `${height}px`,
    manipulation: {
      enabled: true,
    },
  }

  const visJsRef = React.useRef<HTMLDivElement>(null)

  const handleClickNode = (nodeId: string | null, nodePanelXY?: { x: number; y: number }) => {
    setNodeId(nodeId)
    setNodePanelXY(nodePanelXY ?? null)
  }
  const handleAddNode = (id: string, label: string) => {
    nodeDataSet.add([{
      id,
      label,
      color: DEFAULT_COLOR,
    }])
    return
  }

  React.useEffect(() => {
    const network = visJsRef.current && new Network(visJsRef.current, graphData, options)
    // Use `network` here to configure events, etc
    eventEmit(network, handleClickNode, handleAddNode)

    return () => {
      network?.destroy()
    }
  }, [visJsRef, nodes, edges])

  return (
    <>
      <div ref={visJsRef} />
      {nodeId && nodePanelXY && (
        <NodePanel
          x={nodePanelXY.x}
          y={nodePanelXY.y}
          nodeData={nodes.find((node) => node.id === nodeId) ?? {
            id: '',
            label: '',
            completed: false,
          }}
          isVisible={!!nodeId}
          onClose={() => handleClickNode(null)}
          onModifySubmit={() => 'submit'}
          onDelete={() => 'delete'}
          onAdd={() => 'add'}
        />
      )}
    </>
  )
}

export default KnowledgeGraph
