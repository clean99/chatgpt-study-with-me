import * as React from 'react'
// eslint-disable-next-line
// @ts-ignore  react-graph-vis don't have types yet.
import Graph, { Edge as OVisEdge } from 'react-graph-vis'
import { Completed, Edge, Node } from '../../types/types'
import NodePanel from '../NodePanel'
import EditButton from './components/EditButton'
import { onDoubleClick } from './events'
import { edgeFactory, edgeToVisEdge, eventWrapper, nodeFactory, nodeToVisNode } from './utils'
import _ from 'lodash'
import styles from './index.module.scss'

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
  const network = React.useRef<any>(null)
  const { nodes: defaultNodes, edges: defaultEdges } = data
  const [nodeId, setNodeId] = React.useState<string | null>(null)
  const [editable, setEditable] = React.useState<boolean>(false)
  // graph for api
  const [graphData, setGraphData] = React.useState<{
    nodes: Node[]
    edges: Edge[]
  }>({
    nodes: defaultNodes,
    edges: defaultEdges,
  })
  // graph for vis to render
  const graph = {
    nodes: graphData.nodes.map(nodeToVisNode),
    edges: graphData.edges.map(edgeToVisEdge),
  }

  const options = {
    width: `${width}px`,
    height: `${height}px`,
    nodes: {
      shape: 'box',
    },
    edges: {
      arrows: {
        to: {
          enabled: true,
        },
      },
      smooth: {
        enabled: true,
        type: 'dynamic',
        roundness: 0.5,
      },
    },
    manipulation: {
      addEdge: (data: OVisEdge, callback: (edge: OVisEdge) => void) => {
        console.warn('addEdge', data);
        if (data.from == data.to) {
          return;
        }
        const edge = { ...data, id: Math.random() };
        setGraphData((prev) => ({
          nodes: prev.nodes,
          edges: [...prev.edges, edge],
        }));
        callback(edge);
      },
    },
  };

  const addNode = (node: Node) => {
    setGraphData((prev) => ({
      nodes: [...prev.nodes, node],
      edges: prev.edges,
    }))
  }

  const handleClickNode = (nodeId: string | null) => {
    setNodeId(nodeId)
  }

  const closeNodePanel = () => handleClickNode(null)
  
  const handleGetNetwork = (newNetwork: any) => {
    network.current = newNetwork;
  }

  const handleAddNode = (label: string) => {
    addNode(nodeFactory(label))
  }

  const hanldeAddNodesWithParent = (nodeId: string, titles: string[]) => {
    closeNodePanel()
    const newNodes = titles.map((title) => nodeFactory(title))
    const newEdges = newNodes.map((node) => edgeFactory(nodeId, node.id))
    setGraphData((prev) => ({
      nodes: [...prev.nodes, ...newNodes],
      edges: [...prev.edges, ...newEdges],
    }))
  }

  const handleDeleteNode = (nodeId: string) => {
    handleClickNode(null)
    setGraphData((prev) => ({
      nodes: prev.nodes.filter((node) => node.id !== nodeId),
      edges: prev.edges.filter((edge) => edge.from !== nodeId && edge.to !== nodeId),
    }))
  }

  const handleModifyNode = ({ label, completed }: Node) => {
    closeNodePanel()
    setGraphData((prev) => ({
      nodes: prev.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            label,
            completed,
          }
        }
        return node
      }),
      edges: prev.edges,
    }))
  }

  const events = {
    doubleClick: eventWrapper(_.curryRight(onDoubleClick)(handleClickNode)(handleAddNode), editable),
    DragEvent: {
      dragEnd: (event: any) => {
        console.log(event);
      },
      dragStart: (event: any) => {
        console.log(event);
      }

    }
  }

  React.useEffect(() => {
    if (network.current) {
      if(editable) {
        network.current.addEdgeMode()
      } else {
        network.current.disableEditMode()
      }
    }
  }, [network, editable, graphData])

  return (
    <div>
      <Graph graph={graph} options={options} events={events} getNetwork={handleGetNetwork} />
      <div className={styles.toolbar}>
        <EditButton editable={editable} setEditable={setEditable} />
      </div>
      {nodeId && (
        <NodePanel
          x={10}
          y={10}
          nodeData={
            graphData.nodes.find((node) => node.id === nodeId) ?? {
              id: '',
              label: '',
              completed: Completed.NOT_COMPLETED,
            }
          }
          isVisible={!!nodeId}
          onClose={closeNodePanel}
          onModifySubmit={handleModifyNode}
          onDelete={handleDeleteNode}
          onAdd={hanldeAddNodesWithParent}
        />
      )}
    </div>
  )
}

export default KnowledgeGraph
