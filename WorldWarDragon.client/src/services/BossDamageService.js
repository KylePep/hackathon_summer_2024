import { AppState } from "@/AppState.js"
import { BossDamage } from "@/models/BossDamage.js"

class BossDamageService {

  async createOrIncreaseBossDamage(bossDamageData) {
    const res = await api.post('api/bossDamage', bossDamageData)
    // const bossDamage = new BossDamage(res.data)
    AppState.boss.hp -= bossDamageData.dmg
    return bossDamage
  }

  async updateBossDamageByBossId(bossDamageData) {
    await api.put(`api/bossDamage/${bossDamageData.bossId}`, bossDamageData)
    AppState.activeBoss.hp -= bossDamageData.dmg
  }

  async removeBossDamageById(bossDamageId) {
    await api.delete(`api/bossDamage/${bossDamageId}`)
  }

}
export const bossDamageService = new BossDamageService()