export type Override<T, K extends keyof T, R> = Omit<T, K> & Record<K, R>

export type Nullable<T> = T | null | undefined;