export enum VisNodeColor {
  COMPLETED = '#e04141',
  NOT_COMPLETED = '#e09c41',
}

export interface VisNode {
  id: string
  label: string
  color: VisNodeColor
}

export interface VisEdge {
  id: string // VisEdge ID
  from: string // VisNode ID
  to: string // VisNode ID
}
