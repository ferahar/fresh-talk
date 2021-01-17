type Indexed = {
    [key in string]: object | unknown
}

export function setState(object: Indexed | unknown, path:unknown, value: unknown) {
  if (typeof path !== 'string') {
    throw new Error('Path must be string')
  }
  if (typeof object !== 'object') {
    return object
  }

  const pathArr = path.split('.')
  const rhs: Indexed = {}

  pathArr.reduce((res, key, index) => {
    if (index === pathArr.length - 1) {
      res[key] = value
      return res
    } else {
      res[key] = {}
      return res[key] as Indexed
    }
  }, rhs);

  function merge(lhs: Indexed, rhs: Indexed) {
    Object.keys(rhs).forEach(key => {
      const value = rhs[key];
      if (typeof value === 'object' && value!==null && !Array.isArray(value)) {
        if (!lhs[key]) {
          lhs[key] = {}
        }
        merge(lhs[key] as Indexed, rhs[key]as Indexed)
      } else {
        lhs[key] = value
      }
    });
    return lhs
  }
  return merge(object as Indexed, rhs)
}
