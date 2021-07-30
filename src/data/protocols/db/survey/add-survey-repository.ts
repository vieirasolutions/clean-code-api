import { AddSurveyModel } from './'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
