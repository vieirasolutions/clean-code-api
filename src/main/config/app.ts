import express from 'express'
import setupMidlewares from './middlewares'

const app = express()
setupMidlewares(app)
export default app
