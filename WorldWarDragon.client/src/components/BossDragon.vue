<template>
  <div class="boss-dragon text-outline-bg text-2p position-absolute text-center ms-4  pb-1 px-3 fs-3">
    <p class="m-0 p-0 text-outline">
      <img class="dragon-icon" src="/assets/dragonIcon.png" alt="">
    </p>
    <div class=" px-3">
      <h1 class="fs-5">{{ activeBoss.name }}</h1>
      <h2 class="fs-5">{{ Math.round(activeBoss.hp - activeBoss.damages) }}</h2>
    </div>
  </div>
</template>


<script>
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { computed, onMounted } from "vue";
import { bossService } from "../services/BossService.js";

export default {
  setup() {
    async function getBosses() {
      try {
        await bossService.getBosses()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getBosses()
    })
    return {
      activeBoss: computed(() => AppState.activeBoss),
    }
  }
}
</script>


<style lang="scss" scoped>
.dragon-icon {
  max-height: 48px;
  width: auto;
}

.boss-dragon {
  font-weight: 400;
  font-style: normal;
  color: var(--bs-text);
  box-shadow: 2px 0px 10px #0000008c;
  background-color: var(--bs-body-bg);
  // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.25' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right top, #343a40, #2b2c31, #211f22, #151314, #000000);
  border: 1px solid var(--bs-outline);
  border-top: 0px;
  border-radius: 0px 0px 16px 16px;
  padding-top: 1rem;


  >div {
    display: none;
  }
}

.boss-dragon:hover {

  >div {
    display: block
  }

}
</style>