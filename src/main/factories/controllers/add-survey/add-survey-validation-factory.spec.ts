import { ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeAddSurveyValidation } from '../add-survey/add-survey-validation-factory'
import { ValidatorJsAdapter } from '../../../../infra/validators/validatorjs-adapter'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    validations.push(new ValidatorJsAdapter({
      question: 'required|string',
      answers: 'required|array',
      'answers.*.answer': 'required|string',
      'answers.*.image': 'url'
    }))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
