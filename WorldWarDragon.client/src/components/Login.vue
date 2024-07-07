<template>
  <div>
    <div v-if="!user.isAuthenticated"
      class="text-color-5 d-flex flex-row flex-md-column align-items-center justify-content-center text-center  fs-6 fs-lg-4">
      <div @click="login" class="btn selectable text-color-5">
        Login
      </div>
      <router-link :to="{ name: 'Home' }">
        <div class="btn selectable text-color-5 text-center ">
          HOME
        </div>
      </router-link>
    </div>
    <div v-else
      class="text-color-5 d-flex flex-row flex-md-column align-items-center justify-content-around text-center  fs-6 fs-lg-4">
      <!-- <div class="dropdown my-2 my-lg-0"> -->
      <!-- <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false"> -->
      <div v-if="account.picture || user.picture">
        <img :src="account.picture || user.picture" alt="account photo" class="nav-img  rounded my-3" />
      </div>
      <!-- </div> -->
      <router-link :to="{ name: 'Home' }">
        <div class="text-color-5 selectable mt-3 mt-md-0 mb-3">
          HOME
        </div>
      </router-link>
      <router-link :to="{ name: 'Account' }">
        <div class="text-color-5 selectable mt-3 mt-md-0 mb-3">
          Account
        </div>
      </router-link>
      <div class="btn btn-primary mt-3 mt-md-0 mb-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"><i
          class="mdi mdi-plus-thick"></i>
        Event
      </div>
      <div class="text-color-5 selectable mt-3 mt-md-0 mb-3" @click="logout">
        <i class="mdi mdi-logout"></i>
        logout
      </div>
      <!-- <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
        <div class="list-group">
        </div>
      </div> -->
    </div>
    <!-- </div> -->
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

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .nav-img {
    height: 8vh;
    width: 8vh;

  }
}




@media screen and (max-width: 768px) {
  .nav-img {
    height: 5vh;
    width: 5vh;
  }
}
</style>
