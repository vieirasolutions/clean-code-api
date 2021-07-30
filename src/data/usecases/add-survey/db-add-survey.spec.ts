import { AddSurveyModel, SurveyAnswer, DbAddSurvey, AddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveyAnswer = (): SurveyAnswer => ({
  image: 'any_image',
  answer: 'any_answer'
})
const makeFakeAddSurveyModel = (): AddSurveyModel => ({
  answers: [makeFakeSurveyAnswer()],
  question: 'any_questim'
})

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyModel: AddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new AddSurveyRepositoryStub()
}

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSurveyRepositorySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeAddSurveyModel())
    expect(addSurveyRepositorySpy).toHaveBeenCalledWith(makeFakeAddSurveyModel())
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAddSurveyModel())
    await expect(promise).rejects.toThrow()
  })
})
