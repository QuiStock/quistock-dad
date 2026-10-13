export type TUserRole = 'ADMIN' | 'GERENTE' | 'GERENTE_REGIONAL' | 'FUNCIONARIO'

export type TAccountStatus = 'ACTIVE' | 'INACTIVE'

export interface IApiErrorResponse {
  error?: string
  message: string
  errors?: { [key: string]: string }
}

export interface IUserAccount {
  id: string
  name: string
  email: string
  role: TUserRole
  status: TAccountStatus
  profile_photo_url: string | null
  store_id: string | null
  store_code: string | null
  store_name: string | null
  region_id: string | null
  region_code: string | null
  region_name: string | null
}

export type IProfile = IUserAccount

export type IManager = IUserAccount

export interface ICreateManagerPayload {
  name: string
  email: string
  password: string
}

export interface IUpdateManagerPayload {
  name?: string
  email?: string
  status?: TAccountStatus
  replacement_manager_id?: number
}

export type ITeamMember = IUserAccount

interface ICreateTeamMemberBase {
  name: string
  email: string
  password: string
}

export type ICreateTeamMemberPayload =
  | (ICreateTeamMemberBase & { role: 'FUNCIONARIO'; store_id: number })
  | (ICreateTeamMemberBase & { role: 'GERENTE_REGIONAL'; region_id: number })

export interface IUpdateTeamMemberPayload {
  name?: string
  email?: string
  status?: TAccountStatus
  store_id?: number
  region_id?: number
}

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

export interface IDashboardSummary {
  total_products: number
  high_risk_products: number
  medium_risk_products: number
  low_risk_products: number
  suggested_actions: number
  suggested_promotions: number
  suggested_stock_orders: number
  near_expiry_products: number
  stockout_products: number
  overstock_products: number
  active_actions: number
}
