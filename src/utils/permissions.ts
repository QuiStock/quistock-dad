import type { TUserRole } from '@/types'

const MANAGERS_ACCESS_ROLES: TUserRole[] = ['ADMIN', 'REGIONAL_MANAGER']

export const canManageManagers = (role?: TUserRole | null): boolean =>
  !!role && MANAGERS_ACCESS_ROLES.includes(role)
