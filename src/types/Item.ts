export interface ItemMetadata {
  key: string
  value: string
}

export interface Item {
  id: string
  name: string
  description: string
  categoryId: string
  latitude: number
  longitude: number
  metadata?: ItemMetadata[]
}
