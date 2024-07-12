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
          <h2 class="">{{ activeBoss.hp - activeBoss.damages }}</h2>
        </div>
      </div>
    </div>

    <div v-if="account.id" class="col-12 d-flex justify-content-center">
      <router-link :to="{ name: 'Game' }" class="btn fight-btn p-3 fs-1 fw-bold">JOIN THE FIGHT!</router-link>
    </div>

  </section>
</template>


<script>
import { assistancesService } from "../services/AssistancesService.js";
import { AppState } from "../AppState.js";
import { messagesService } from "../services/MessagesService.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted, watchEffect } from "vue";
import { bossService } from "../services/BossService.js";
import { logger } from "../utils/Logger.js";
import { bossDamageService } from "../services/BossDamageService.js";
import { useRoute } from "vue-router";

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
      bosses: computed(() => AppState.bosses)

    }
  }
}
</script>


<style lang="scss" scoped>
.hero-title {
  font-size: 64px;

  color: #ff4500;

  // border: 2px solid white;
  // border-radius: 8px;

  text-shadow: 4px 4px 4px black;
}

.fight-btn {
  background-color: #ff4500;
  color: black
}

.boss-dragon-img {
  width: 40%;
  height: 40vh;

  >div {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.593) 40%);
  }

  background-position: center;
  background-size: cover;
}
</style>