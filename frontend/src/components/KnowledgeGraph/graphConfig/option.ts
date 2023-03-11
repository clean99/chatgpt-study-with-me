import { Edge, EdgeFromTo } from '../../../types/types';
import { addEdgeValidator } from '../utils';

export const optionGenerator = (width: number, height: number, addEdge: (data: any) => void, edges: Edge[]) => ({
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
    manipulation:{
      addEdge: (data: EdgeFromTo) => {
        if (!addEdgeValidator(edges, data)) {
          return
        }
        addEdge(data);
      },
    }
})