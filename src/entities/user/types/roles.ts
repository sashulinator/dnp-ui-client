export const roles = {
  Admin: 'Admin',
  Approver: 'Approver',
  Operator: 'Operator',
}

export type Role = keyof typeof roles
