import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class AssistancesService {

  async claimAssistance(assistanceId, userId) {
    const claimedAssistance = await this.getAssistancesById(assistanceId)
    claimedAssistance.claim = true

    await claimedAssistance.save()
    return claimedAssistance
  }

  async getAssistancesById(assistanceId) {
    const assist = await dbContext.Assistance.findById(assistanceId)
    if (!assist) {
      throw new BadRequest(`No assist found with id:${assistanceId}`)
    }
    return assist
  }


  async getAssistances() {
    const assistances = await dbContext.Assistance.find().populate('creator', 'name picture')
    return assistances
  }


  async createAssistance(assistanceData) {
    const newAssistance = (await dbContext.Assistance.create(assistanceData)).populate('creator', 'name picture')
    return newAssistance
  }
  async removeAssistanceById(assistanceId, userId) {
    const assistance = await dbContext.Assistance.findById(assistanceId)
    if (!assistance) {
      throw new BadRequest(`Assistance with ID${assistanceId} does not exist`)
    }
    if (assistance.creatorId != userId) {
      throw new Forbidden('You can not delete an assistance you do not own')
    }
    await assistance.remove()
    return `${assistance} has been removed`
  }

}
export const assistancesService = new AssistancesService()