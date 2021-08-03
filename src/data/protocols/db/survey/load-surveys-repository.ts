import { SurveyModel } from '../../../usecases/add-survey/db-add-survey-protocols'

export interface LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
