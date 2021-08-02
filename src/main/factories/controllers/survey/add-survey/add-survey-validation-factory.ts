import { ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { ValidatorJsAdapter } from '../../../../../infra/validators/validatorjs-adapter'
export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new ValidatorJsAdapter({
    question: 'required|string',
    answers: 'required|array',
    'answers.*.answer': 'required|string',
    'answers.*.image': 'url'
  }))
  return new ValidationComposite(validations)
}
