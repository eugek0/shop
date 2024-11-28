export const setSessionStorage = (key: string, item: any) => {
  sessionStorage.setItem(key, JSON.stringify(item))
}

export const getSessionStorage = (key: string) =>
  JSON.parse(sessionStorage.getItem(key) || '[]') ?? null
