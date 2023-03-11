import { VisNodeColor } from '../components/KnowledgeGraph/type';

export const colorWithTitles = [
    { title: 'Completed', color: VisNodeColor.COMPLETED },
    { title: 'In progress', color: VisNodeColor.NOT_COMPLETED },
]

export const instruction = ['Double click in white space: add new node', 'Double click in node: open node panel', 'Drag from node to node: add new edge', 'Click on edge: show delete button']