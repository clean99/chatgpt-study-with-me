import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Edge, KnowledgeEdgeType, Node } from '../../types/types'
import KnowledgeGraph from '../../components/KnowledgeGraph'

export default {
  component: KnowledgeGraph,
  title: 'Components/KnowledgeGraph',
} as ComponentMeta<typeof KnowledgeGraph>

const Template: ComponentStory<typeof KnowledgeGraph> = (args) => <KnowledgeGraph {...args} />

const nodes: Node[] = [
  { id: 'node1', label: 'Node 1', completed: true },
  { id: 'node2', label: 'Node 2', completed: false },
  { id: 'node3', label: 'Node 3', completed: true },
]

const edges: Edge[] = [
  { id: 'edge1', from: 'node1', to: 'node2', type: KnowledgeEdgeType.HAS_KNOWLEDGE },
  { id: 'edge2', from: 'node1', to: 'node3', type: KnowledgeEdgeType.HAS_KNOWLEDGE },
]

export const Default = Template.bind({})
Default.args = {
  data: {
    nodes,
    edges,
  },
}
