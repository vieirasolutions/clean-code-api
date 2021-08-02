import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { AddSurveyModel, SurveyAnswer } from '../../domain/usecases/add-survey'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeFakeSurveyAnswer = (): SurveyAnswer[] => [
  {
    image: 'http://image.com',
    answer: 'Answer 1'
  },
  {
    answer: 'Answer 2'
  }
]

const makeFakeAddSurveyModel = (): AddSurveyModel => ({
  answers: makeFakeSurveyAnswer(),
  question: 'Question'
})

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeAddSurveyModel())
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Breno Vieira Soares',
        email: 'breno@gmail.com',
        password: 'any',
        role: 'admin'
      })
      const id = res.insertedId
      const accessToken = sign({ id: id.toHexString() }, env.jwtSecret)
      await accountCollection.updateOne({ _id: id }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeAddSurveyModel())
        .expect(204)
    })
  })
})
