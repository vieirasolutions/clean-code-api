import { Validation } from '../../presentation/protocols'
import Validator, { Rules } from 'validatorjs'

export class ValidatorJsAdapter implements Validation {
  constructor (
    private readonly rules: Rules
  ) {}

  validate (input: any): Error {
    const validation = new Validator(input, this.rules)

    if (validation.fails()) {
      const errors = validation.errors.all()
      const error = Object.keys(errors)[0]
      const message = validation.errors.first(error).toString()
      return new Error(message)
    }

    return null
  }
}
