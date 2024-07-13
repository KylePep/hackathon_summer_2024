import { AppState } from "../AppState.js"
import { Message } from "../models/Message.js"
import { logger } from "../utils/Logger.js"
import { accountService } from "./AccountService.js"
import { api } from "./AxiosService.js"

class MessagesService {

  async getMessages() {
    const res = await api.get('api/messages')
    logger.log('[MESSAGES]', res.data)
    const messages = res.data.map(m => new Message(m))
    AppState.messages = messages
    messages.forEach((m) => {
      if (m.boon == 'gold') {
        AppState.goldMod[`${m.roomId}`]++
      } else if (m.boon == 'health') {
        AppState.healthMod[`${m.roomId}`]++
      } else if (m.boon == 'power') {
        AppState.powerMod[`${m.roomId}`]++
      } else {
        AppState.luckMod[`${m.roomId}`]++
      }
      logger.log(AppState)
    })
  }

  async createMessage(messageData, cost) {
    if (AppState.account.gold < cost) {
      return 'not enough gold'
    } else {
      AppState.account.gold -= cost
      accountService.editAccount(AppState.account)
      const res = await api.post('api/messages', messageData)
      const message = new Message(res.data)
      AppState.messages.push(message)
      if (message.boon == 'gold') {
        AppState.goldMod[`${message.roomId}`]++
      } else if (message.boon == 'health') {
        AppState.healthMod[`${message.roomId}`]++
      } else if (message.boon == 'power') {
        AppState.powerMod[`${message.roomId}`]++
      } else {
        AppState.luckMod[`${message.roomId}`]++
      }
      return message
    }
  }

  async deleteMessage(messageId) {
    const res = await api.delete(`api/messages/${messageId}`)
    logger.log('[Deleted Assitance]', res.data)
    const message = AppState.messages.find((m) => m.id == messageId)
    AppState.messages = AppState.messages.filter(a => a.id != messageId)

    if (message.boon == 'gold') {
      AppState.goldMod[`${message.roomId}`] -= 1
    } else if (message.boon == 'health') {
      AppState.healthMod[`${message.roomId}`] -= 1
    } else if (message.boon == 'power') {
      AppState.powerMod[`${message.roomId}`] -= 1
    } else {
      AppState.luckMod[`${message.roomId}`] -= 1
    }
  }

}
export const messagesService = new MessagesService()