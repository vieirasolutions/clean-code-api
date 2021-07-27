import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

interface SutTypes {
  sut: RequiredFieldValidation
}
const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('any_field')
  return {
    sut
  }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails ', () => {
    const { sut } = makeSut()
    const error = sut.validate({ other_field: 'other' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if a validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
