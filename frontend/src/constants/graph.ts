import { VisNodeColor } from '../components/KnowledgeGraph/type'

export const COLOR_WITH_TITLES = [
  { title: 'Completed', color: VisNodeColor.COMPLETED },
  { title: 'In progress', color: VisNodeColor.NOT_COMPLETED },
]

export const INSTRUCTION = [
  'Double click in white space: add new node',
  'Double click in node: open node panel',
  'Drag from node to node: add new edge',
  'Click on edge: show delete button',
]

export const INSTRUCTION_TITLE = 'Knowledge Graph'
