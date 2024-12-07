export type Union<S = string, T extends string | number = string> = T | Omit<S, T>
