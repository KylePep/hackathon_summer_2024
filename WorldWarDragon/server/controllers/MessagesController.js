import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { messagesService } from "../services/MessagesServices.js";

export class MessagesController extends BaseController {
  constructor() {
    super('api/messages')
    this.router
      .get('', this.getMessages)


      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMessage)
      .delete('/:messageId', this.removeMessageById)
  }

  async getMessages(req, res, next) {
    try {
      const messages = await messagesService.getMessages()
      return res.send(messages)
    } catch (error) {
      next(error);
    }
  }

  async createMessage(req, res, next) {
    try {
      const messageData = req.body
      messageData.creatorId = req.userInfo.id
      const message = await messagesService.createMessage(messageData)
      return res.send(message)
    } catch (error) {
      next(error);
    }
  }
  async removeMessageById(req, res, next) {
    try {
      const messageId = req.params.messageId
      const userId = req.userInfo.id
      const isAdmin = req.userInfo.role.includes('admin')
      const assistance = await messagesService.removeMessageById(messageId, userId, isAdmin)
      return res.send(assistance)
    } catch (error) {
      next(error);
    }
  }
}
