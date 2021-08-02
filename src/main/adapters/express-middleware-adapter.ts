import { HttpRequest, HttpResponse, Middleware } from '../../presentation/protocols'
import { NextFunction, Request, RequestHandler, Response } from 'express'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse: HttpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).send({ error: httpResponse.body.message })
    }
  }
}
