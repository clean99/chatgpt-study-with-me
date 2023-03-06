export function onSelect(
  e: any,
  handleClickNode: (nodeId: string | null, nodePanelXY?: { x: number; y: number }) => void,
) {
  const { nodes } = e
  if (nodes.length > 0) {
    const node = nodes[0]
    const { x, y } = e.pointer.DOM
    return handleClickNode(node, { x, y })
  }
  handleClickNode(null)
}

export function onDoubleClick(e: any, handleAddNode: (label: string) => void) {
  if (e.nodes.length > 0) {
    return
  }
  handleAddNode('New Node')
}
