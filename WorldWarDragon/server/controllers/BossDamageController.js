import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bossDamageService } from "../services/BossDamageService.js";

export class BossDamageController extends BaseController {
  constructor() {
    super('api/bossDamage')
    this.router
      .get('/', this.getBossDamages)
      .get('/:bossId/boss', this.getBossDamageByBossId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createOrIncreaseBossDamage)
  }

  async getBossDamages(req, res, next) {
    try {
      const damages = await bossDamageService.getBossDamages()
      return res.send(damages)
    } catch (error) {
      next(error);
    }
  }
  async getBossDamageByBossId(req, res, next) {
    try {
      const bossId = req.params.bossId
      const dmg = await bossDamageService.getBossDamagesByBossId(bossId)
      return res.send(dmg)
    } catch (error) {
      next(error);
    }
  }

  async createOrIncreaseBossDamage(req, res, next) {
    try {
      const bossDamageData = req.body
      bossDamageData.creatorId = req.userInfo.id
      const boss = await bossDamageService.createOrIncreaseBossDamage(bossDamageData)
      return res.send(boss)
    } catch (error) {
      next(error);
    }
  }
  // async updateBossDamageByBossId(req, res, next) {
  //   try {
  //     const bossId = req.params.bossId
  //     const userId = req.userInfo.id
  //     const boss = await bossDamageService.updateBossDamageByBossId(bossId, userId)
  //     return res.send(boss)
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}