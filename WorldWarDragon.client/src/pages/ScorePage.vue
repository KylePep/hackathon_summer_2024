<template>
  <section class="row">
    <div class="col-12 fs-1 fw-bold text-center text-light">
      Hall of Valor
    </div>
  </section>
  <section class="row">
    <div class="col-12 text-center fs-1 text-light" v-for="score in bossDamages" :key="score.id">
      <img class="character-icon" :src="score.creator.picture" alt="">
      {{ score.creator.name
      }}
      {{ Math.round(score.dmg) }}
    </div>
  </section>
</template>


<script>
import Pop from "../utils/Pop.js";
import { bossDamageService } from "../services/BossDamageService.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { CHARACTER_ICONS_DATA } from '../../../shared/constants/index.js'

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
      bossDamages: computed(() => AppState.bossDamages.filter((b) => b.bossId == AppState.activeBoss.id).sort((a, b) => b.dmg - a.dmg))
    }
  }
}
</script>


<style lang="scss" scoped>
.character-icon {
  height: 32px;
  width: auto;
}
</style>