import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class BossDamageService {
  async getBossDamages() {
    const bossDamages = await dbContext.BossDamage.find().populate('creator', 'name picture level dragons')
    return bossDamages
  }


  async createOrIncreaseBossDamage(bossDamageData) {
    const bossDamage = await this.getUserBossDamageByBossId(bossDamageData)
    if (!bossDamage) {
      const newBossDamage = await dbContext.BossDamage.create(bossDamageData)
      return newBossDamage
    } else {
      const updatedBossDamage = this.updateBossDamage(bossDamage, bossDamageData)
      return updatedBossDamage
    }
  }

  async getUserBossDamageByBossId(bossDamageData) {
    const bossDamage = await dbContext.BossDamage.findOne({ bossId: bossDamageData.bossId, creatorId: bossDamageData.creatorId })
    if (!bossDamage) {
      return bossDamage
      // throw new BadRequest(`No bossDamage found with id:${bossDamageData.bossId}`)
    }
    if (bossDamage.creatorId != bossDamageData.creatorId) {
      throw new Forbidden('An error has occurred')
    }
    return bossDamage
  }

  async getBossDamagesByBossId(bossId) {

    const bossDamages = await dbContext.BossDamage.find({ bossId: bossId });
    const totalDamage = bossDamages.reduce((accumulator, current) => {
      return accumulator + current.dmg;
    }, 0);

    return { totalDamage };
  }

  async updateBossDamage(bossDamage, bossDamageData) {
    const bossDamageUpdate = await dbContext.BossDamage.findById(bossDamage.id)
    bossDamageUpdate.dmg += bossDamageData.dmg
    await bossDamageUpdate.save()
    return bossDamageUpdate
  }

  // async updateBossDamageByBossId(bossData, userId) {
  //   const bossToUpdate = await this.getBossDamageByBossId(bossData.bossId)

  //   // bossToUpdate.name = bossData.name || bossToUpdate.name
  //   // bossToUpdate.hp = bossData.hp || bossToUpdate.hp
  //   // bossToUpdate.image = bossData.image || bossToUpdate.image

  //   await bossToUpdate.save()

  //   return bossToUpdate
  // }
}
export const bossDamageService = new BossDamageService()