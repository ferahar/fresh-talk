type Indexed = {
    [key in string]: unknown;
}
type Result = Indexed & string

export function findState(obj: Indexed, path: string): Result | boolean {
  const args = path.split('.')

  let result:Result = obj as Result;

  for (let i = 0; i < args.length; i++) {
    const arg: keyof Indexed = args[i]
    // eslint-disable-next-line no-prototype-builtins
    if (!arg || !result.hasOwnProperty(arg)) {
      return false
    }

    result = result[arg] as Result
  }
  return result
}
