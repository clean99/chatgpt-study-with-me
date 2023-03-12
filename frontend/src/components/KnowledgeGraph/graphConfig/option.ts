import { Edge, EdgeFromTo } from '../../../types/types'
import { addEdgeValidator } from '../utils'

export const optionGenerator = (
  addEdge: (data: any) => void,
  edges: Edge[],
) => ({
  nodes: {
    shape: 'dot',
    size: 16,
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
    color: {
      // color:'#848484',
      highlight:'#848484',
      hover: '#d3d2cd',
      inherit: false,
      opacity:1.0
  }
  },
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -26,
      centralGravity: 0.005,
      springLength: 230,
      springConstant: 0.18,
    },
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: { iterations: 150 },
  },
  manipulation: {
    //  must give a callback or it will throw an error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addEdge: (data: EdgeFromTo, callback: (data: any) => void) => {
      if (!addEdgeValidator(edges, data)) {
        return
      }
      addEdge(data)
    },
  },
})
