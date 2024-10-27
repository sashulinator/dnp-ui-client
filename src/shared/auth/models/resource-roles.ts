export const resourceRoles = {
  admin: 'dnp-admin',
  approver: 'dnp-approver',
  operator: 'dnp-operator',
}

export type ResorceRoles = (typeof resourceRoles)[keyof typeof resourceRoles]
