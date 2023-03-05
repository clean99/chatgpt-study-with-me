import * as React from 'react'
import { Network } from 'vis-network'
import { Edge, Node } from '../../types/types'

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

  const nodeDataSet = nodes.map((node) => {
    return {
      id: node.id,
      label: node.label,
      color: node.completed ? '#ff4d4f' : undefined,
    }
  })

  const edgeDataSet = edges.map((edge) => {
    return {
      id: edge.id,
      from: edge.from,
      to: edge.to,
      arrows: 'to',
    }
  })

  const graphData = {
    nodes: nodeDataSet,
    edges: edgeDataSet,
  }

  const options = {
    width: `${width}px`,
    height: `${height}px`,
  }

  const visJsRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const network = visJsRef.current && new Network(visJsRef.current, graphData, options)
    // Use `network` here to configure events, etc
  }, [visJsRef, nodes, edges])

  return <div ref={visJsRef} />
}

export default KnowledgeGraph
