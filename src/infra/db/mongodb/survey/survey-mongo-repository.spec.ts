import { Collection } from 'mongodb'
import { AddSurveyModel, SurveyAnswer } from '../../../../data/protocols/db/survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

const makeFakeSurveyAnswer = (): SurveyAnswer[] => [
  {
    image: 'any_image',
    answer: 'any_answer'
  },
  {
    answer: 'other_answer'
  }
]

const makeFakeAddSurveyModel = (): AddSurveyModel => ({
  answers: makeFakeSurveyAnswer(),
  question: 'any_question',
  date: new Date()
})

describe('Survey Mongo Repository', () => {
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

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('Should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeAddSurveyModel())
    const survey = await surveyCollection.findOne({ question: makeFakeAddSurveyModel().question })
    expect(survey).toBeTruthy()
    expect(survey._id).toBeTruthy()
    expect(survey.question).toBe(makeFakeAddSurveyModel().question)
    expect(survey.answers).toEqual(makeFakeAddSurveyModel().answers)
  })
})
