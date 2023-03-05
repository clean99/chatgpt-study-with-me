import { Network } from 'vis-network'

const isBlankSpace = (event: any) => (event.nodes.length == 0) && (event.edges.length == 0);

export function eventEmit(network: Network | null, handleClickNode: (nodeId: string | null, nodePanelXY?: {
    x: number;
    y: number;
}) => void, handleAddNode: (id: string, label: string) => void) {
    if (network) {
        network.on('click', (event) => {
          const nodeId = event.nodes[0];
          const xy = event.pointer.DOM;
          if (nodeId !== undefined) {
            return handleClickNode(nodeId, xy);
          }
          return handleClickNode(null);
        });
        network.on('doubleClick', (event) => {
            const pointer = event.pointer;
            if(isBlankSpace(event)) {
                const { x, y } = network.canvasToDOM({ x: pointer.canvas.x, y: pointer.canvas.y });
                // TODO: connect to backend to create a new node
                handleAddNode( `${x}${y}`, 'new node');
            }
        });
}
}
