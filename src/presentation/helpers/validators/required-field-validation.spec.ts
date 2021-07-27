import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails ', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ other_field: 'other' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if a validation success', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
