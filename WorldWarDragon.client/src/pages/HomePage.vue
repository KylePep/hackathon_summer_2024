<template>
  <section class="row">
    <div class="col-12  text-center ">
      <h1 class="hero-title">WORLD WAR <br> DRAGON</h1>
    </div>
  </section>
  <section class="row g-3">


    <div class="col-12 text-center">
      <h1>{{ activeBoss.name }}</h1>
      <h2 class="">{{ activeBoss.hp - activeBoss.damages }}</h2>
      <img :src="activeBoss.image" class="img-fluid" alt="">
    </div>

    <div class="col-12 d-flex justify-content-center">
      <button class="btn btn-primary p-3 fs-1 fw-bold">JOIN THE FIGHT!</button>
    </div>

    <div class="col-12 text-center fs-5">
      <p>The dragons have invaded planet earth! No one knows where they came from but they must be stopped!</p>
      <p> The largest dragon of them all, {{ activeBoss.name }}, blocks out the sun! It must be taken down at all costs!
      </p>
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

export default {
  setup() {

    async function getMessages() {
      try {
        await messagesService.getMessages()
      } catch (error) {
        Pop.error(error.message)
      }
    }



    async function getAssistances() {
      try {
        await assistancesService.getAssistances()
      } catch (error) {
        Pop.error(error.message)
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
      getMessages()
      getAssistances()
      getBosses()
      getBossDamageByBossId()
    })


    return {
      messages: computed(() => AppState.messages),
      assistances: computed(() => AppState.assistances),
      activeBoss: computed(() => AppState.activeBoss),
      bosses: computed(() => AppState.bosses)

    }
  }
}
</script>


<style lang="scss" scoped>
.hero-title {
  font-size: 96px;
  margin: 4rem 0rem 4rem 0rem;
}
</style>