import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { BossDamage } from "../models/BossDamage.js"

class BossDamageService {

  async getBossDamages() {
    const res = await api.get('api/bossDamage')
    AppState.bossDamages = res.data.map(b => new BossDamage(b))
    AppState.bossDamages.forEach((bs) => {
      if (bs.creator.picture.length < 2) {
        bs.creator.picture = `/assets/player/player${bs.creator.picture}.jpeg`
      }
    });
    logger.log('[BOSS DAMAGGES]', AppState.bossDamages)
  }

  async createOrIncreaseBossDamage(bossDamageData) {
    const res = await api.post('api/bossDamage', bossDamageData)
    const bossDamage = new BossDamage(res.data)
    AppState.activeBoss.damages += bossDamageData.dmg
    return bossDamage
  }

  async getBossDamageByBossId(bossId) {
    const res = await api.get(`api/bossDamage/${bossId}/boss`)
    logger.log('[DAMAGES]', res.data)
    AppState.activeBoss.damages = res.data.totalDamage
    return res.data
  }

}
export const bossDamageService = new BossDamageService()