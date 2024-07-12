<template>
  <section class="row">
    <div class="col-12 fs-1 fw-bold text-center">
      SCORE PAGE
    </div>
  </section>
  <section class="row">
    <div class="col-12 text-center fs-1 " v-for="score in bossDamages" :key="score.id">{{ score.creator.name }}
      {{ score.dmg }}
    </div>
  </section>
</template>


<script>
import Pop from "../utils/Pop.js";
import { bossDamageService } from "../services/BossDamageService.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    onMounted(() => {
      setBgImg();
      getBossDamages();
    });

    async function getBossDamages() {
      try {
        await bossDamageService.getBossDamages()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    const setBgImg = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        let bgImg = '../public/assets/dragonCave2.jpeg';
        mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
      }
    }
    return {
      bossDamages: computed(() => AppState.bossDamages.sort((a, b) => b.dmg - a.dmg))
    }
  }
}
</script>


<style lang="scss" scoped></style>