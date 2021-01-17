export function objectForm(data: FormData) {
  const object: Record<string, unknown> = {}

  for (const [name, value] of data) {
    object[name] = value
  }

  return object
}
