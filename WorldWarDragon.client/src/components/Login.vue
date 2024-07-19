<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class=" my-2 my-lg-0 d-flex flex-column justify-content-center align-items-center">
        <router-link :to="{ name: 'Account' }" class=" border-0 selectable no-select">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40"
              class="login-icon rounded selectable no-select" />
          </div>
        </router-link>
        <!-- <router-link :to="{ name: 'Account' }">
          <div class="btn text-success lighten-30 selectable text-uppercase">
            Manage Account
          </div>
        </router-link> -->
        <div class="d-flex ">
          <div class="py-2 pe-3 text-uppercase text-light fw-semibold">
            {{ account.name }} | Level : 1
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

<style lang="scss" scoped>
.login-icon {
  width: auto;
  height: 256px;
}
</style>
