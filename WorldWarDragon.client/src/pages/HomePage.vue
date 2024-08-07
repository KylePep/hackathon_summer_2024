<template>
  <div class="full-page d-flex flex-column justify-content-around">
    <section class="row">
      <div class="col-12 text-center d-flex justify-content-center ">
        <h1 class="hero-title text-outline p-3">WORLD <br> WAR <br> DRAGON</h1>
      </div>
    </section>

    <section class="row g-3">
      <div class="col-12 text-center d-flex justify-content-center">
        <div class="boss-dragon-img border border-2 border-light rounded d-flex flex-column justify-content-end"
          :style="{ backgroundImage: `url(${activeBoss.image})` }">
          <div class="pt-5 px-5 text-outline-bg ">
            <h4>{{ activeBoss.name }}</h4>
            <h5 class="">{{ Math.round(activeBoss.hp - activeBoss.damages) }}</h5>
          </div>
        </div>
      </div>
    </section>

    <section class="row g-2">

      <div class="col-6 col-md-2 order-2 order-md-1 offset-0 offset-md-2 d-flex justify-content-center">
        <router-link :to="{ name: 'Map' }" class="btn fight-btn text-outline w-100 p-3 fw-bold">MAP</router-link>
      </div>

      <div v-if="account?.id" class="col-12 col-md-4 order-1 order-md-2 d-flex justify-content-center">
        <router-link :to="{ name: 'Game' }" class="btn fight-btn text-outline p-3 fs-3 w-100 fw-bold ">JOIN THE
          FIGHT!</router-link>
      </div>
      <div v-else class="col-12 col-md-4 order-1 order-md-2 d-flex justify-content-center">

        <div class="btn fight-btn text-outline p-3 fs-1 w-100 fw-bold" @click="login" v-if="!identity">
          Login
        </div>
      </div>

      <div class="col-6 col-md-2 order-3 d-flex justify-content-center">
        <router-link :to="{ name: 'Score' }" class="btn fight-btn text-outline p-3 w-100 fw-bold">HALL OF
          VALOR</router-link>
      </div>

    </section>

  </div>
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
        let bgImg = '/assets/towerbg4.jpeg';
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
.full-page {
  height: 100vh;
}

.hero-title {
  font-family: "Press Start 2P", system-ui;
  font-weight: 400;
  font-style: normal;
  font-size: 6vh;

  text-shadow: rgb(0, 0, 0) 4px 0px 0px, rgb(0, 0, 0) 3.87565px 0.989616px 0px, rgb(0, 0, 0) 3.51033px 1.9177px 0px, rgb(0, 0, 0) 2.92676px 2.72656px 0px, rgb(0, 0, 0) 2.16121px 3.36588px 0px, rgb(0, 0, 0) 1.26129px 3.79594px 0px, rgb(0, 0, 0) 0.282949px 3.98998px 0px, rgb(0, 0, 0) -0.712984px 3.93594px 0px, rgb(0, 0, 0) -1.66459px 3.63719px 0px, rgb(0, 0, 0) -2.51269px 3.11229px 0px, rgb(0, 0, 0) -3.20457px 2.39389px 0px, rgb(0, 0, 0) -3.69721px 1.52664px 0px, rgb(0, 0, 0) -3.95997px 0.56448px 0px, rgb(0, 0, 0) -3.97652px -0.432781px 0px, rgb(0, 0, 0) -3.74583px -1.40313px 0px, rgb(0, 0, 0) -3.28224px -2.28625px 0px, rgb(0, 0, 0) -2.61457px -3.02721px 0px, rgb(0, 0, 0) -1.78435px -3.57996px 0px, rgb(0, 0, 0) -0.843183px -3.91012px 0px, rgb(0, 0, 0) 0.150409px -3.99717px 0px, rgb(0, 0, 0) 1.13465px -3.8357px 0px, rgb(0, 0, 0) 2.04834px -3.43574px 0px, rgb(0, 0, 0) 2.83468px -2.82216px 0px, rgb(0, 0, 0) 3.44477px -2.03312px 0px, rgb(0, 0, 0) 3.84068px -1.11766px 0px, rgb(0, 0, 0) 3.9978px -0.132717px 0px;
  color: #ff7300;
}

.fight-btn {
  background-color: var(--bs-body-bg);
  // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.25' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right top, #343a40, #2b2c31, #211f22, #151314, #000000);
  border: 2px solid white;
  font-family: "Press Start 2P", system-ui;
  color: #ff7300; //ff7300
  display: flex;
  justify-content: center;
  align-items: center;
}

.boss-dragon-img {
  font-family: "Metal Mania", system-ui;
  font-family: "Press Start 2P", system-ui;
  font-weight: 400;
  font-style: normal;
  width: auto;
  height: 30vh;
  // max-height: 256px;
  // max-width: 514px;

  >div {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.593) 40%);
  }

  background-position: center;
  background-size: cover;
}
</style>