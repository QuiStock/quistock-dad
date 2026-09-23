type TAddSuffix<T extends Record<string, any>, Suffix extends string> = {
  [K in keyof T as `${string & K}${Suffix}`]: T[K]
}

export const addSuffix = <T extends Record<string, any>, S extends string>(
  object: T,
  suffix: S,
): TAddSuffix<T, S> => {
  const result: any = {}

  for (const key in object) {
    result[`${key}${suffix}`] = object[key]
  }

  return result
}

export type { TAddSuffix }
