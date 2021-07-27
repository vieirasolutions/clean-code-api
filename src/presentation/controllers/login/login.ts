import { Controller, EmailValidator, HttpRequest, HttpResponse } from './login-protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email } = httpRequest.body

      this.emailValidator.isValid(email)
    } catch (error) {
      return serverError(error)
    }
  }
}
