import { AppState } from "../AppState.js"
import { Message } from "../models/Message.js"
import { logger } from "../utils/Logger.js"
import { accountService } from "./AccountService.js"
import { api } from "./AxiosService.js"

class MessagesService {

  async getMessages() {
    const res = await api.get('api/messages')
    const messages = res.data.map(m => new Message(m))
    AppState.messages = messages
    AppState.goldMod = { 1: 0, 2: 0, 3: 0, 4: 0 }
    AppState.healthMod = { 1: 0, 2: 0, 3: 0, 4: 0 }
    AppState.luckMod = { 1: 0, 2: 0, 3: 0, 4: 0 }
    AppState.powerMod = { 1: 0, 2: 0, 3: 0, 4: 0 }
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
    })
    logger.log('MODS', AppState.goldMod, AppState.healthMod, AppState.powerMod, AppState.luckMod)
  }

  async createMessage(messageData, cost) {
    if (AppState.account.gold < cost) {
      return 'not enough gold'
    } else {
      AppState.account.gold -= cost
      AppState.account.valor += Math.round(cost / 2)
      accountService.editAccount(AppState.account)
      const res = await api.post('api/messages', messageData)
      const message = new Message(res.data)
      AppState.messages.unshift(message);
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