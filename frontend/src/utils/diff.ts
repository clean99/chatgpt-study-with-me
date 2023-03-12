import { Edge, Node } from '../types/types'

export interface Identifiable {
  id: string
}
export enum IDCompare {
  EQUAL = 0,
  SMALL = -1,
  BIG = 1,
}

export interface CompareResult {
  idCompare: IDCompare
  log?: string
  isUpdated: boolean
}

export interface DiffResult<T extends Identifiable> {
  added: T[]
  deleted: string[]
  updated: T[]
}

export function deletedLog<T extends Identifiable>(item: T, resLog: DiffResult<T>) {
  return resLog.deleted.push(item.id)
}

export function addedLog<T extends Identifiable>(item: T, resLog: DiffResult<T>) {
  return resLog.added.push(item)
}

export function updatedLog<T extends Identifiable>(item: T, resLog: DiffResult<T>) {
  return resLog.updated.push(item)
}

// sort and diff, time complexity O(n log n)
export function diff<T extends Identifiable>(
  oldNode: T[],
  newNode: T[],
  compare: (a: T, b: T) => CompareResult,
  sorter: (a: T, b: T) => number,
) {
  const resLog = {
    added: [],
    deleted: [],
    updated: [],
  }
  oldNode.sort(sorter)
  newNode.sort(sorter)
  let p1 = 0
  let p2 = 0

  while (p1 < oldNode.length && p2 < newNode.length) {
    const result = compare(oldNode[p1], newNode[p2])
    if (result.idCompare === IDCompare.EQUAL) {
      if (result.isUpdated) {
        updatedLog(newNode[p2], resLog)
      }
      p1++
      p2++
    } else if (result.idCompare === IDCompare.SMALL) {
      deletedLog(oldNode[p1], resLog)
      p1++
    } else {
      addedLog(newNode[p2], resLog)
      p2++
    }
  }

  while (p1 < oldNode.length) {
    deletedLog(oldNode[p1], resLog)
    p1++
  }

  while (p2 < newNode.length) {
    addedLog(newNode[p2], resLog)
    p2++
  }

  return resLog
}

export function sorter(a: Identifiable, b: Identifiable) {
  return a.id.localeCompare(b.id)
}

export function nodeCompare(a: Node, b: Node) {
  const idCompare = a.id.localeCompare(b.id)
  if (idCompare !== IDCompare.EQUAL) {
    return {
      idCompare,
      isUpdated: false,
    }
  }

  const isUpdated = a.label !== b.label || a.completed !== b.completed
  return {
    idCompare,
    isUpdated,
  }
}

export function edgeCompare(a: Edge, b: Edge) {
  const idCompare = a.id.localeCompare(b.id)
  if (idCompare !== IDCompare.EQUAL) {
    return {
      idCompare,
      isUpdated: false,
    }
  }

  const isUpdated = a.from !== b.from || a.to !== b.to || a.type !== b.type
  return {
    idCompare,
    isUpdated,
  }
}
