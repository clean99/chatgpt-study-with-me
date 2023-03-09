import { ComponentStory, ComponentMeta } from '@storybook/react'
import KnowledgeGraph from '../../components/KnowledgeGraph'
import { KnowledgeGraphMockStore } from '../stores/KnowledgeGraphStore'

export default {
  component: KnowledgeGraph,
  title: 'Components/KnowledgeGraph',
} as ComponentMeta<typeof KnowledgeGraph>

const Template: ComponentStory<typeof KnowledgeGraph> = (args) => <KnowledgeGraph {...args} />

const mockStore = new KnowledgeGraphMockStore()

export const Default = Template.bind({})
Default.args = {
  data: {
    nodes: mockStore.nodes,
    edges: mockStore.edges,
  },
};