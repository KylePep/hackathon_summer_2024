import { AppState } from "../AppState.js"
import { Message } from "../models/Message.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class MessagesService {

  async getMessages() {
    const res = await api.get('api/messages')
    logger.log('[MESSAGES]', res.data)
    AppState.messages = res.data.map(m => new Message(m))
  }

  async createMessage(messageData) {
    const res = await api.post('api/messages', messageData)
    const message = new Message(res.data)
    AppState.messages.push(message)
    return message
  }

  async deleteMessage(messageId) {
    const res = await api.delete(`api/messages/${messageId}`)
    logger.log('[Deleted Assitance]', res.data)
    AppState.messages = AppState.messages.filter(a => a.id != messageId)
  }

}
export const messagesService = new MessagesService()