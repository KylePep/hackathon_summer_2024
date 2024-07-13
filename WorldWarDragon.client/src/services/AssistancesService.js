import { Assistance } from "../models/Assistance.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { accountService } from "./AccountService.js"

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

  async claimAssistance(assistanceId) {
    const res = await api.put(`api/assistances/${assistanceId}/claim`)
    logger.log('[Claim Assistance]', res.data)
    const claimedAssist = AppState.assistances.find((a) => a.id == assistanceId)

    const accountData = AppState.account
    accountData[claimedAssist.body] = AppState.account[claimedAssist.body] + 1

    accountService.editAccount(accountData)

    claimedAssist.claim = true
    return claimedAssist
  }

  async deleteAssistance(assistanceId) {
    const res = await api.delete(`api/assistances/${assistanceId}`)
    logger.log('[Deleted Assistance]', res.data)
    AppState.assistances = AppState.assistances.filter(a => a.id != assistanceId)
  }

}
export const assistancesService = new AssistancesService()