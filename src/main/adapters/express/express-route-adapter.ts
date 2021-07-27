import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { Request, Response, RequestHandler } from 'express'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).send({ error: httpResponse.body.message })
    }
  }
}
