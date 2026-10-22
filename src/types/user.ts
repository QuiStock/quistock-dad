export type TUserRole = 'ADMIN' | 'MANAGER' | 'REGIONAL_MANAGER' | 'EMPLOYEE'

export type TAccountStatus = 'ACTIVE' | 'INACTIVE'

export interface IUserAccount {
  id: string
  name: string
  email: string
  role: TUserRole
  status: TAccountStatus
  profile_photo_url: string | null
  store_id: number | null
  store_code: string | null
  store_name: string | null
  region_id: number | null
  region_code: string | null
  region_name: string | null
}

export type IProfile = IUserAccount
