import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { bossDamageService } from "./BossDamageService.js";

class BossService {
  async getBosses() {
    const bosses = await dbContext.Boss.find()
    return bosses
  }


  async createBoss(bossData) {
    const newBoss = (await dbContext.Boss.create(bossData))
    return newBoss
  }

  async getBossById(bossId) {
    const boss = await dbContext.Boss.findById({ id: bossId })
    if (!boss) {
      throw new BadRequest(`No boss found with id:${bossId}`)
    }
    // const bossDamages = bossDamageService.getBossDamagesByBossId(bossId)
    // boss.damages = (await bossDamages).valueOf()
    return boss
  }

  async updateBossById(bossData, userId) {
    const bossToUpdate = await this.getBossById(bossData.bossId)

    bossToUpdate.name = bossData.name || bossToUpdate.name
    bossToUpdate.hp = bossData.hp || bossToUpdate.hp
    bossToUpdate.image = bossData.image || bossToUpdate.image

    await bossToUpdate.save()

    return bossToUpdate
  }
}
export const bossService = new BossService()