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
}
