import { AppState } from "../AppState.js"
import { Boss } from "../models/Boss.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { bossDamageService } from "./BossDamageService.js"

class BossService {
  async getBosses() {
    const res = await api.get('api/boss')
    AppState.bosses = res.data.map(b => new Boss(b))
    const findActiveBoss = AppState.bosses.find((b) => b.active == true)
    AppState.activeBoss = findActiveBoss
    if (findActiveBoss.image.length < 2) {
      AppState.activeBoss.image = `/assets/boss/bossDragon${findActiveBoss.image}.jpeg`
    }

    bossDamageService.getBossDamageByBossId(AppState.activeBoss.id)
  }

  async getBossById(bossId) {
    const res = await api.get(`api/boss/${bossId}`)
    AppState.activeBoss = new Boss(res.data)
  }

  async createBoss(bossData) {
    const res = await api.post('api/boss', bossData)
    const boss = new Boss(res.data)
    AppState.activeBoss = boss
    return boss
  }

  async updateBossById(bossData) {
    const res = await api.put(`api/boss/${bossData.id}`, bossData)
    const boss = new Boss(res.data)
    AppState.activeBoss = boss
  }

  async setBossActivity(bossId) {
    const res = await api.put(`api/boss/${bossId}/activity`)
    const boss = AppState.bosses.find((b) => b.id == bossId)
    boss.active = !boss.active
  }

}
export const bossService = new BossService()