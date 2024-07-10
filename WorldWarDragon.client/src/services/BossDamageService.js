import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { BossDamage } from "../models/BossDamage.js"

class BossDamageService {

  async createOrIncreaseBossDamage(bossDamageData) {
    const res = await api.post('api/bossDamage', bossDamageData)
    const bossDamage = new BossDamage(res.data)
    AppState.activeBoss.damages += bossDamageData.dmg
    return bossDamage
  }

  async getBossDamageByBossId(bossId) {
    const res = await api.get(`api/bossDamage/${bossId}/boss`)
    logger.log('[DAMAGES]', res.data)
    // const bossDamage = new BossDamage(res.data)
    AppState.activeBoss.damages = res.data.totalDamage
    return res.data
  }

  // async updateBossDamageByBossId(bossDamageData) {
  //   await api.put(`api/bossDamage/${bossDamageData.bossId}`, bossDamageData)
  //   AppState.activeBoss.hp -= bossDamageData.dmg
  // }

  // async removeBossDamageById(bossDamageId) {
  //   await api.delete(`api/bossDamage/${bossDamageId}`)
  // }

}
export const bossDamageService = new BossDamageService()