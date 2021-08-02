import { ValidatorJsAdapter } from './validatorjs-adapter'
import validator, { Rules } from 'validatorjs'

const fails = jest.fn().mockImplementation(() => {
  return {
    fails (): boolean {
      return false
    }
  }
})

const all = jest.fn().mockImplementation(() => ({
  error1: 1,
  error2: 2
}))

const first = jest.fn().mockImplementation(() => {
  return 'same_error'
})

jest.mock('validatorjs', () => {
  return jest.fn().mockImplementation(() => ({
    fails,
    errors: ({
      all,
      first
    })
  }))
})

const makeRules = (): Rules => ({
  name: 'required',
  email: 'required|email'
})

const makeSut = (): ValidatorJsAdapter => {
  return new ValidatorJsAdapter(makeRules())
}

describe('ValidatorJs Adapter', () => {
  test('Should ValidatorJsAdapter calls validatorjs with correct values', () => {
    const sut = makeSut()
    sut.validate({
      name: 'any_name',
      email: 'any_email'
    })

    expect(validator).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email'
    }, makeRules())
  })

  test('Shoud ValidatorJsAdapter calls fails with passes returns false', () => {
    const sut = makeSut()
    fails.mockReturnValueOnce(true)
    const error = sut.validate({
      name: 'any_name',
      email: 'any_email'
    })
    expect(error).toEqual(new Error('same_error'))
  })
})
