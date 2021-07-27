import { InvalidParamError } from '../../errors'
import { CompareFieldsValidations } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidations
}
const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidations('any_field', 'fieldToCompare')
  return {
    sut
  }
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails ', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'value', fieldToCompare: 'other_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if a validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'same_value', fieldToCompare: 'same_value' })
    expect(error).toBeFalsy()
  })
})
