import type { TAccountStatus, TUserRole } from './user'

export const ManagerStatusEnum = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Desativado',
} as const

export type ManagerStatusEnum =
  (typeof ManagerStatusEnum)[keyof typeof ManagerStatusEnum]

export const AccountStatusLabel: Record<TAccountStatus, ManagerStatusEnum> = {
  ACTIVE: ManagerStatusEnum.ACTIVE,
  INACTIVE: ManagerStatusEnum.INACTIVE,
}

export const UserRoleLabel: Record<TUserRole, string> = {
  ADMIN: 'Administrador',
  MANAGER: 'Gerente',
  REGIONAL_MANAGER: 'Gerente regional',
  EMPLOYEE: 'Funcionário',
}
