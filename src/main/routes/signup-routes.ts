import { Router, Response, Request } from 'express'

export default (router: Router): void => {
  router.post('/signup', (req: Request, res: Response) => {
    res.json({ ok: 'ok' })
  })
}
