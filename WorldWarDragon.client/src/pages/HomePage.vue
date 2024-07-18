<template>
  <section class="row">
    <div class="col-12  text-center d-flex justify-content-center ">
      <h1 class="hero-title p-3">WORLD WAR <br> DRAGON</h1>
    </div>
  </section>
  <section class="row g-3">


    <div class="col-12 text-center d-flex justify-content-center">
      <div class="boss-dragon-img border border-2 border-light rounded d-flex flex-column justify-content-end"
        :style="{ backgroundImage: `url(${activeBoss.image})` }">
        <div class="pt-5">
          <h1>{{ activeBoss.name }}</h1>
          <h2 class="">{{ Math.round(activeBoss.hp - activeBoss.damages) }}</h2>
        </div>
      </div>
    </div>

    <div class="col-2 offset-2 d-flex justify-content-center">
      <router-link :to="{ name: 'Map' }" class="btn fight-btn w-100 p-3 fs-2 fw-bold">Map</router-link>
    </div>
    <div v-if="account.id" class="col-4 d-flex justify-content-center">
      <router-link :to="{ name: 'Game' }" class="btn fight-btn p-3 fs-1 w-100 fw-bold">JOIN THE FIGHT!</router-link>
    </div>
    <div v-else class="col-4 d-flex justify-content-center">

      <div class="btn fight-btn p-3 fs-1 w-100 fw-bold" @click="login" v-if="!user.isAuthenticated">

        Login
      </div>
    </div>
    <div class="col-2 d-flex justify-content-center">
      <router-link :to="{ name: 'Score' }" class="btn fight-btn p-3 fs-2 w-100 fw-bold">HALL OF VALOR</router-link>
    </div>

  </section>
</template>


<script>
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted, watchEffect } from "vue";
import { bossService } from "../services/BossService.js";
import { logger } from "../utils/Logger.js";
import { bossDamageService } from "../services/BossDamageService.js";
import { AuthService } from '../services/AuthService'

export default {
  setup() {

    onMounted(() => {
      setBgImg();
    });

    const setBgImg = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        let bgImg = '../public/assets/towerbg4.jpeg';
        mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
      }
    }



    async function getBosses() {
      try {
        await bossService.getBosses()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function getBossDamageByBossId() {
      try {
        if (AppState.activeBoss.id != null) {
          logger.log('[ActiveBossId]', AppState.activeBoss.id)
          await bossDamageService.getBossDamageByBossId(AppState.activeBoss.id)
        }
      } catch (error) {
        Pop.error(error.message, '[]')
      }
    }

    onMounted(() => {

      getBosses()
      getBossDamageByBossId()
    })


    return {
      account: computed(() => AppState.account),
      activeBoss: computed(() => AppState.activeBoss),
      bosses: computed(() => AppState.bosses),

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
.hero-title {
  font-family: "Metal Mania", system-ui;
  font-weight: 400;
  font-style: normal;
  font-size: 64px;

  color: #ff7300;

  // border: 2px solid white;
  // border-radius: 8px;

  text-shadow: 4px 4px 4px black;
}

.fight-btn {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.25' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right top, #343a40, #2b2c31, #211f22, #151314, #000000);
  border: 1px solid white;
  color: #ff7300; //ff7300
}

.boss-dragon-img {
  font-family: "Metal Mania", system-ui;
  font-weight: 400;
  font-style: normal;
  width: 40%;
  height: 40vh;
  max-width: 512px;

  >div {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.593) 40%);
  }

  background-position: center;
  background-size: cover;
}
</style>