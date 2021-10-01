export const config = { headers: { 'Content-Type': 'application/json' } }
export const authConfig = token => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
}
