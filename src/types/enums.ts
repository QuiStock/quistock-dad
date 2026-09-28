export const ManagerStatusEnum = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Desativado',
} as const

export type ManagerStatusEnum =
  (typeof ManagerStatusEnum)[keyof typeof ManagerStatusEnum]
