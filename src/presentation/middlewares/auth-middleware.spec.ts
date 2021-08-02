import { /* HttpRequest, */ HttpResponse } from '../protocols'
import { forbidden } from '../helpers/http/http-helper'
import { UnauthenticatedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'

// const makeHttpRequest = (): HttpRequest => ({
//   headers: {
//     'x-access-token': 'any_token'
//   }
// })

interface SutTypes {
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware()
  return {
    sut
  }
}

describe('Auth Middleware', () => {
  test('Should return forbidden if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new UnauthenticatedError()))
  })
})
