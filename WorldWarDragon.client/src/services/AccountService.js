import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }

    if (AppState.account.picture.length < 2) {
      AppState.account.picture = `public/assets/player/player${AppState.account.picture}.jpeg`
    }
  }

  async editAccount(accountData) {
    logger.log(accountData)
    const res = await api.put(`/account`, accountData)
    const account = new Account(res.data)
    AppState.account = account
    if (account.picture.length < 2) {
      AppState.account.picture = `public/assets/player/player${account.picture}.jpeg`
    }
  }
}

export const accountService = new AccountService()
