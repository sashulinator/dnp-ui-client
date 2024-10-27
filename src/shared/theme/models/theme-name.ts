export const themeName = {
  light: 'light',
  dark: 'dark',
  default: 'light',
} as const

export type ThemeName = (typeof themeName)[keyof typeof themeName]
