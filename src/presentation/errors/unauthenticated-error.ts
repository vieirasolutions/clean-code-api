export class UnauthenticatedError extends Error {
  constructor () {
    super('Unauthenticated')
    this.name = 'UnauthenticatedError'
  }
}
