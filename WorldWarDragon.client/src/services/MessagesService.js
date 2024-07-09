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

}
export const messagesService = new MessagesService()