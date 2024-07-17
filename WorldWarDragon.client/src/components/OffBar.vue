<template>
  <nav class="navbar  fixed-top pt-0">
    <div class="container-fluid px-0 disable-click">

      <section class="can-click row w-100 mt-0  mt-0">
        <div class="col-4  ps-3 pt-1">
          <LoginSmall />
        </div>
        <div class="col-4 d-flex justify-content-center position-relative">
          <BossDragon />
        </div>
      </section>

      <section v-if="account.id" class="row ps-2 d-flex text-light disable-click fw-bold text-shadow">
        <div>
          VALOR: {{ account.valor }} ( {{ account.valor - appState.account.valorSpent }} )
        </div>
        <div class=" ">
          GOLD: {{ account.gold }}
        </div>
        <div>
          HEALTH: {{ account.health }} ( {{ appState.healthMod[appState.activeRoom.id] }} )
        </div>
        <div>
          POWER: {{ account.power }} ( {{ appState.powerMod[appState.activeRoom.id] }} )
        </div>
        <div>
          Attack: {{ account.attack }}
        </div>
        <div>
          Shield: {{ account.shield }}
        </div>
        <div>
          heal: {{ account.heal }}
        </div>

      </section>



      <div class="can-click offcanvas offcanvas-start bg-dark" tabindex="-1" id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel">

        <div class="offcanvas-header mb-5">
          <router-link :to="{ name: 'Home' }" class="offcanvas-title fs-4 selectable fw-semibold text-light"
            id="offcanvasNavbarLabel">World War
            Dragon</router-link>
          <button class="btn text-light" @click="toggleTheme"
            :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
            <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
          </button>
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
              <router-link class="btn text-success lighten-30 selectable text-uppercase" :to="{ name: 'Account' }">
                ACCOUNT
              </router-link>
            </li>


            <li class="nav-item">
              <router-link :to="{ name: 'Score' }" class="btn text-success lighten-30 selectable text-uppercase">
                SCORE
              </router-link>
            </li>

            <li class="nav-item">
              <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
                About
              </router-link>
            </li>

            <li class="nav-item">
              <router-link :to="{ name: 'Map' }" class="btn text-success lighten-30 selectable text-uppercase">
                Map
              </router-link>
            </li>


          </ul>

        </div>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import LoginSmall from './LoginSmall.vue';
import { AppState } from "../AppState.js";

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

// watchEffect(() => {
//   AppState.account.id

// })

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}

const account = computed(() => AppState.account)
const appState = computed(() => AppState)

</script>


<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}

li {
  padding-bottom: 32px;
}

.text-shadow {
  text-shadow: 2px 2px 0px black;
}

.disable-click {
  pointer-events: none;

  >.can-click {
    pointer-events: all;
  }
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