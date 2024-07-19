import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class MessagesService {
  async getMessages() {
    const messages = await dbContext.Message.find().populate('creator', 'name picture')
    return messages
  }


  async createMessage(messageData) {
    const newMessage = (await dbContext.Message.create(messageData)).populate('creator', 'name picture')
    return newMessage
  }

  async removeMessageById(messageId, userId, isAdmin) {
    const message = await dbContext.Message.findById(messageId)
    if (!message) {
      throw new BadRequest(`Message with ID${messageId} does not exist`)
    }
    if (message.creatorId != userId && !isAdmin) {
      throw new Forbidden('You can not delete an message you do not own')
    }
    await message.remove()
    return `${message} has been removed`
  }
}
export const messagesService = new MessagesService()