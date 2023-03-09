
export function onDoubleClick(e: any, handleAddNode: (label: string) => void, handleClickNode:  (nodeId: string | null) => void) {
  if (e.nodes.length > 0) {
    return handleClickNode(e.nodes[0])
  }
  handleAddNode('New Node')
}
