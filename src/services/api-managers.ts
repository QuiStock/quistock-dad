import { coreApi, normalizeApiError } from '@/services/api-client'
import type {
  ICreateManagerPayload,
  ICreateTeamMemberPayload,
  IManager,
  ITeamMember,
  IUpdateManagerPayload,
  IUpdateTeamMemberPayload,
} from '@/types'

export const MANAGERS_QUERY_KEY = ['/managers']
export const managerDetailQueryKey = (id: string | number) => [
  '/managers',
  String(id),
]
export const TEAM_MEMBERS_QUERY_KEY = ['/team-members']
export const teamMemberDetailQueryKey = (id: string | number) => [
  '/team-members',
  String(id),
]
export const getManagers = async () => {
  try {
    return await coreApi.get<IManager[]>('/managers')
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível carregar os gerentes.')
  }
}

export const getManagerById = async (id: string | number) => {
  try {
    return await coreApi.get<IManager>(`/managers/${id}`)
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível carregar o gerente.')
  }
}

export const createManager = async (payload: ICreateManagerPayload) => {
  try {
    return await coreApi.post<IManager>('/managers', payload)
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível cadastrar o gerente.')
  }
}

export const updateManager = async (
  id: string | number,
  payload: IUpdateManagerPayload,
) => {
  try {
    return await coreApi.patch<IManager>(`/managers/${id}`, payload)
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível atualizar o gerente.')
  }
}

export const getTeamMembers = async () => {
  try {
    return await coreApi.get<ITeamMember[]>('/team-members')
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível carregar os membros da equipe.',
    )
  }
}

export const getTeamMemberById = async (id: string | number) => {
  try {
    return await coreApi.get<ITeamMember>(`/team-members/${id}`)
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível carregar o membro da equipe.',
    )
  }
}

export const createTeamMember = async (payload: ICreateTeamMemberPayload) => {
  try {
    return await coreApi.post<ITeamMember>('/team-members', payload)
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível cadastrar o membro da equipe.',
    )
  }
}

export const updateTeamMember = async (
  id: string | number,
  payload: IUpdateTeamMemberPayload,
) => {
  try {
    return await coreApi.patch<ITeamMember>(`/team-members/${id}`, payload)
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível atualizar o membro da equipe.',
    )
  }
}
