import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('accessToken'))
  }
}))

interface SutTypes {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret')
  return {
    sut
  }
}
describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toBeCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return a token on sign success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('accessToken')
  })
})
