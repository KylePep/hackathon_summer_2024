<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login" v-if="!identity">
      Login
    </button>
    <div v-else>
      <div class=" my-2 my-lg-0 d-flex flex-column justify-content-center align-items-center">
        <router-link :to="{ name: 'Account' }" class=" border-0 selectable no-select">
          <div v-if="account?.picture || user.picture">
            <img :src="account?.picture || user.picture" alt="account photo" height="40"
              class="login-icon rounded selectable no-select" />
          </div>
        </router-link>

        <div class="d-flex flex-column">
          <div class="py-2 pe-3 text text-uppercase fw-semibold">
            {{ account?.name }} | Level : {{ account?.level }}
          </div>
          <div class="text-danger btn lighten-30 selectable text-uppercase" @click="logout">
            <i class="mdi mdi-logout "></i>
            logout
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0 w-100" aria-labelledby="authDropdown">
          <div class="list-group">
          </div>
        </div>
      </div>
    </div>
  </span>
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
.text {
  color: var(--bs-text);
}

.login-icon {
  width: 100%;
  height: auto;
}
</style>
