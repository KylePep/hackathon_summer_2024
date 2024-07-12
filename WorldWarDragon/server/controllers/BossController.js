import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bossService } from "../services/BossService.js";

export class BossController extends BaseController {
  constructor() {
    super('api/boss')
    this.router
      .get('', this.getBosses)
      .get('/:bossId', this.getBossById)


      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBoss)
      .put('/:bossId', this.updateBossById)
      .put('/:id/activity', this.setBossActivity)
  }

  async getBosses(req, res, next) {
    try {
      const bosses = await bossService.getBosses()
      return res.send(bosses)
    } catch (error) {
      next(error);
    }
  }

  async getBossById(req, res, next) {
    try {
      const bossId = req.params.bossId
      const boss = await bossService.getBossById(bossId)
      return res.send(boss)
    } catch (error) {
      next(error);
    }
  }

  async createBoss(req, res, next) {
    try {
      const bossData = req.body
      bossData.creatorId = req.userInfo.id
      const boss = await bossService.createBoss(bossData)
      return res.send(boss)
    } catch (error) {
      next(error);
    }
  }
  async updateBossById(req, res, next) {
    try {
      const bossId = req.params.bossId
      const userId = req.userInfo.id
      const boss = await bossService.updateBossById(bossId, userId)
      return res.send(boss)
    } catch (error) {
      next(error);
    }
  }

  async setBossActivity(req, res, next) {
    try {
      const bossId = req.params.id
      const boss = await bossService.setBossActivity(bossId)
      return res.send(boss)
    } catch (error) {
      next(error);
    }
  }
}
