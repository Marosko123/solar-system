export type Id = string | number
export type Dictionary<T> = { [K in Id]: T }
export type Nullable<T> = T | null
