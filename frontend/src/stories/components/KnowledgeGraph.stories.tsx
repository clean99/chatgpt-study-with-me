import { ComponentStory, ComponentMeta } from '@storybook/react'
import KnowledgeGraph from '../../components/KnowledgeGraph'
import { Completed, KnowledgeEdgeType } from '../../types/types'

export default {
  component: KnowledgeGraph,
  title: 'Components/KnowledgeGraph',
  parameters: {
    mockData: [
      {
        url: `${process.env.REACT_APP_API_DOMAIN}/graph`,
        method: 'GET',
        status: 200,
        response: {
          nodes: [
            { id: 'node1', label: 'Node 1', completed: Completed.COMPLETED },
            { id: 'node2', label: 'Node 2', completed: Completed.NOT_COMPLETED },
            { id: 'node3', label: 'Node 3', completed: Completed.COMPLETED },
          ],
          edges: [
            { id: 'edge1', from: 'node1', to: 'node2', type: KnowledgeEdgeType.HAS_KNOWLEDGE },
            { id: 'edge2', from: 'node1', to: 'node3', type: KnowledgeEdgeType.HAS_KNOWLEDGE },
          ],
        },
      },
    ],
  },
} as ComponentMeta<typeof KnowledgeGraph>

const Template: ComponentStory<typeof KnowledgeGraph> = (args) => <KnowledgeGraph {...args} />

export const Default = Template.bind({})
Default.args = {}
