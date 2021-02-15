export function errorRequest(data: XMLHttpRequest) {
  let textError: string
  if (data.status>=500) {
    textError = 'Server is not available'
  } else {
    const error = JSON.parse(data.response)
    textError = `${error.reason}, status: ${data.status}`
  }
  throw new Error(textError)
}
