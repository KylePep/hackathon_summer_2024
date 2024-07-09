import { dbContext } from "../db/DbContext.js";

class MessagesService {
  async getMessages() {
    const messages = await dbContext.Message.find().populate('creator', 'name picture')
    return messages
  }


  async createMessage(messageData) {
    const newMessage = (await dbContext.Message.create(messageData)).populate('creator', 'name picture')
    return newMessage
  }
}
export const messagesService = new MessagesService()