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
  /** @type {import('./models/BossDamage.js').BossDamage.js} */
  bossDamages: [],
  bossDamage: 0,
  gold: 0,
  valor: 0,
  health: 0,
  power: 0,
  activeRoom: '',

  goldMod: { 1: 0, 2: 0, 3: 0, 4: 0 },
  healthMod: { 1: 0, 2: 0, 3: 0, 4: 0 },
  luckMod: { 1: 0, 2: 0, 3: 0, 4: 0 },
  powerMod: { 1: 0, 2: 0, 3: 0, 4: 0 },
})
