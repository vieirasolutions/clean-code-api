import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { AddSurveyModel, SurveyAnswer } from '../../domain/usecases/add-survey'
let surveyCollection: Collection

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
  })

  describe('POST /surveys', () => {
    test('Should return 204 on add survey success', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeAddSurveyModel())
        .expect(204)
    })
  })
})
