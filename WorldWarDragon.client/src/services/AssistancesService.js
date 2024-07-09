import { Assistance } from "../models/Assistance.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AssistancesService {

  async getAssistances() {
    const res = await api.get('api/assistances')
    logger.log('[ASSISTANCES]', res.data)
    AppState.assistances = res.data.map(a => new Assistance(a))
  }

  async createAssistance(messageData) {
    const res = await api.post('api/assistances', messageData)
    const assistance = new Assistance(res.data)
    AppState.assistances.push(assistance)
    return assistance
  }

}
export const assistancesService = new AssistancesService()