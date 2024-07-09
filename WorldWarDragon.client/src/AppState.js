import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Message.js').Message.js} */
  messages: [],
  /** @type {import('./models/Assistance.js').Assistance.js} */
  assistances: [],
  /** @type {import('./models/Boss.js').Boss.js} */
  activeBoss: {},
  /** @type {import('./models/Boss.js').Boss.js} */
  bosses: [],
})
