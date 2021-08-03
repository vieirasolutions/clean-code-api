import { Collection } from 'mongodb'
import { AddSurveyModel, SurveyAnswerModel } from '../../../../data/protocols/db/survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

const makeFakeSurveyAnswer = (): SurveyAnswerModel[] => [
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

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}
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

  describe('add()', () => {
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

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany([
        { ...makeFakeAddSurveyModel() },
        { ...makeFakeAddSurveyModel(), question: 'other_question' }
      ])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
})
