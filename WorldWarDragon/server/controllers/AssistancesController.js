import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { messagesService } from "../services/MessagesServices.js";
import { assistancesService } from "../services/AssistancesService.js";

export class AssistancesController extends BaseController {
  constructor() {
    super('api/assistances')
    this.router
      .get('', this.getAssistances)


      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAssistance)
  }

  async getAssistances(req, res, next) {
    try {
      const assistances = await assistancesService.getAssistances()
      return res.send(assistances)
    } catch (error) {
      next(error);
    }
  }

  async createAssistance(req, res, next) {
    try {
      const assistanceData = req.body
      assistanceData.creatorId = req.userInfo.id
      const assistance = await assistancesService.createAssistance(assistanceData)
      return res.send(assistance)
    } catch (error) {
      next(error);
    }
  }
}
