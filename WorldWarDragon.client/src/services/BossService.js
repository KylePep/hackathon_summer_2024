import { AppState } from "../AppState.js"
import { Boss } from "../models/Boss.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class BossService {
  async getBosses() {
    const res = await api.get('api/boss')
    logger.log('[BOSS]', res.data)
    AppState.bosses = res.data.map(b => new Boss(b))
    AppState.activeBoss = AppState.bosses.find((b) => b.active = true)
  }

  async getBossById(bossId) {
    const res = await api.get(`api/boss/${bossId}`)
    AppState.boss = new Boss(res.data)
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

}
export const bossService = new BossService()