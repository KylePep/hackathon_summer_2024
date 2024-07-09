import { dbContext } from "../db/DbContext.js";

class MessagesService {
  async getMessages() {
    const messages = await dbContext.Message.find()
    return messages
  }


  async createMessage(messageData) {
    const newMessage = (await dbContext.Message.create(messageData)).populate('create', 'name picture')
    return newMessage
  }
}
export const messagesService = new MessagesService()