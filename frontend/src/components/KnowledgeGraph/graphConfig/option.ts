export const optionGenerator = (width: number, height: number, addEdge: (data: any, callback: (edge: any) => void) => void) => ({
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
    manipulation: {
      addEdge,
    },
})