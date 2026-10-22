export interface IBranch {
  id: string
  store_id: number
  name: string
  address: string | null
  city: string | null
  state: string | null
  latitude: number | null
  longitude: number | null
}

export interface IStoreItem {
  id: string | number
  name: string
  store_id?: number
  high_flow?: number
  low_flow?: number
  active_orders_count?: number
  active_promotions?: number
  manager?: string
  cep?: string
  state?: string
  city?: string
  street?: string
  number?: string
  complement?: string
  address?: string
}
