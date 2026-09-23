type TAddSuffix<T extends Record<string, unknown>, Suffix extends string> = {
  [K in keyof T as `${string & K}${Suffix}`]: T[K]
}

export const addSuffix = <T extends Record<string, unknown>, S extends string>(
  object: T,
  suffix: S,
): TAddSuffix<T, S> => {
  const result = {} as TAddSuffix<T, S>

  for (const key in object) {
    ;(result as Record<string, unknown>)[`${key}${suffix}`] = object[key]
  }

  return result
}

export type { TAddSuffix }
