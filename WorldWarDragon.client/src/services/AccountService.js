import { router } from "../router.js"
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
      AppState.account.picture = `/assets/player/player${AppState.account.picture}.jpeg`
    }


    if (AppState.account.newAccount == 'true') {

      AppState.account.name = 'Recruit'

      AppState.account.picture = `/assets/player/player0.jpeg`

      AppState.account.newAccount = 'false'

      router.push({ name: "Tutorial" })

      this.editAccount(AppState.account)

    }

  }

  async editAccount(accountData) {
    const res = await api.put(`/account`, accountData)
    const account = new Account(res.data)
    AppState.account = account
    if (account.picture.length < 2) {
      AppState.account.picture = `/assets/player/player${account.picture}.jpeg`
    }
  }
}

export const accountService = new AccountService()
