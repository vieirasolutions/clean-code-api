import { Controller } from '../../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const loginController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(loginController)
}
