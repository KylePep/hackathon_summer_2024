import { reactive } from 'vue'
import { commentsService } from "./services/CommentsService.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
})
