import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { UnauthenticatedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (!accessToken) {
        return forbidden(new UnauthenticatedError())
      }

      const account = await this.loadAccountByToken.load(httpRequest.headers['x-access-token'])
      if (!account) {
        return forbidden(new UnauthenticatedError())
      }

      return ok({ accountId: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
