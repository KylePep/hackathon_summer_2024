import { dbContext } from "../db/DbContext.js";

class AssistancesService {
  async getAssistances() {
    const assistances = await dbContext.Assistance.find().populate('creator', 'name picture')
    return assistances
  }


  async createAssistance(assistanceData) {
    const newAssistance = (await dbContext.Assistance.create(assistanceData)).populate('creator', 'name picture')
    return newAssistance
  }
}
export const assistancesService = new AssistancesService()