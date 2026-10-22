import type { IUserAccount, TAccountStatus } from './user'

export type ITeamMember = IUserAccount

interface ICreateTeamMemberBase {
  name: string
  email: string
  password: string
}

export type ICreateTeamMemberPayload = ICreateTeamMemberBase & {
  role: 'FUNCIONARIO'
  store_id: number
}

export interface IUpdateTeamMemberPayload {
  name?: string
  email?: string
  status?: TAccountStatus
  store_id?: number
  region_id?: number
}
