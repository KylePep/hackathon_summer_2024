<template>
  <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
    v-if="!user.isAuthenticated">
    Login
  </button>
  <div v-else>

    <div type="button" class=" border-0 selectable no-select" data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">

      <div v-if="account.picture || user.picture">
        <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
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
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
