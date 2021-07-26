import { LoginController } from './login'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'

interface SutTypes {
  sut: LoginController
}

const makeHttpRequest = (): any => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeSut = (): SutTypes => {
  const sut = new LoginController()
  return {
    sut
  }
}

describe('Login Controller', () => {
  test('Should return bad request if email is no provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()
    delete httpRequest.body.email
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return bad request if password is no provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()
    delete httpRequest.body.password
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
