export interface KeycloakTokenParsed {
  iss?: string
  sub?: string
  aud?: string
  exp?: number
  iat?: number
  auth_time?: number
  nonce?: string
  acr?: string
  amr?: string
  azp?: string
  picture: string
  preferred_username?: string
  session_state?: string
  realm_access?: Roles
  resource_access?: ResourceAccess
  scope: string
  email_verified: boolean
  name: string
  given_name: string
  family_name: string
  email: string
}

export interface Roles {
  roles: string[]
}

export interface ResourceAccess {
  [key: string]: Roles
}
