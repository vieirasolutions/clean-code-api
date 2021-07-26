import express from 'express'
import setupMidlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
setupMidlewares(app)
setupRoutes(app)
export default app
