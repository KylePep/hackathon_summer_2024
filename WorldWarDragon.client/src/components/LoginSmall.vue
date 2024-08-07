<template>
  <button class="login btn selectable text-2p text-outline" @click="login" v-if="!identity">
    Login
  </button>
  <div v-else>

    <div type="button" class=" border-0 selectable no-select" data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">

      <div v-if="account?.picture || identity?.picture">
        <img :src="account?.picture || identity?.picture" alt="account photo" height="40" class="rounded" />
      </div>

    </div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      identity: computed(() => AppState.identity),
      account: computed(() => AppState.account),
      // user: computed(() => AppState.user),
      // account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background-color: var(--bs-body-bg);
  border: 2px solid white;
  font-family: "Press Start 2P", system-ui;
  color: #ff7300; //ff7300
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
