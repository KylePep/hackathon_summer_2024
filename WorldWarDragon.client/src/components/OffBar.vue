<template>
  <nav class="navbar  fixed-top">
    <div class="container-fluid">

      <div class="px-3 pt-3">
        <LoginSmall />
      </div>

      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

        <div class="offcanvas-header mb-5">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">World War Dragon</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="offcanvas-body text-center">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

            <li>
              <Login />
            </li>

            <li class="nav-item">
              <router-link class="btn text-success lighten-30 selectable text-uppercase" :to="{ name: 'Home' }">
                HOME
              </router-link>
            </li>


            <li class="nav-item">
              <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
                About
              </router-link>
            </li>


          </ul>

        </div>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import LoginSmall from './LoginSmall.vue';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}
</script>


<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}

li {
  padding-bottom: 32px;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>