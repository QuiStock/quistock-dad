import type { AxiosResponse } from 'axios'

import { coreApi, normalizeApiError } from '@/services/api-client'
import type {
  ICreateTeamMemberPayload,
  ITeamMember,
  IUpdateTeamMemberPayload,
} from '@/types'

export const TEAM_MEMBERS_QUERY_KEY = ['/team-members']
export const teamMemberDetailQueryKey = (id: string | number) => [
  '/team-members',
  String(id),
]

export const getTeamMembers = async (
  signal?: AbortSignal,
): Promise<AxiosResponse<ITeamMember[]>> => {
  try {
    return await coreApi.get<ITeamMember[]>('/team-members', { signal })
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível carregar os membros da equipe.',
    )
  }
}

export const getTeamMemberById = async (
  id: string | number,
  signal?: AbortSignal,
): Promise<AxiosResponse<ITeamMember>> => {
  try {
    return await coreApi.get<ITeamMember>(`/team-members/${id}`, { signal })
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível carregar o membro da equipe.',
    )
  }
}

export const createTeamMember = async (
  payload: ICreateTeamMemberPayload,
): Promise<AxiosResponse<ITeamMember>> => {
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
): Promise<AxiosResponse<ITeamMember>> => {
  try {
    return await coreApi.patch<ITeamMember>(`/team-members/${id}`, payload)
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível atualizar o membro da equipe.',
    )
  }
}
