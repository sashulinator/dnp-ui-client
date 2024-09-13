export const DEAFAULT_NAME = 'light'

export function getCurrentName(): 'light' | 'dark' {
  return (localStorage.getItem('theme') as 'light') || DEAFAULT_NAME
}
