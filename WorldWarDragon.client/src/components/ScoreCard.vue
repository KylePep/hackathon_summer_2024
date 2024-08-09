<template>
  <!-- <section class="row mt-3 justify-content-center text-light"> -->
  <section class="row character-card  mt-3 text-center text-V text-outline-bg border border-1 border-outline rounded ">
    <div class="col-4 col-md-3 fs-1 text-outline text-start rounded" :style="{ backgroundImage: `url(${bgIcon})` }"
      style="background-position: center; background-size: cover;">{{ index + 1 }}</div>
    <div class="col-4 col-md-4 d-flex flex-column flex-md-column justify-content-around fs-1 overflow-x-hidden">
      <div v-if="scoreProp.creator.name.length > 6" :title="scoreProp.creator.name">
        <div class="marquee d-md-none">
          {{ scoreProp.creator.name }}
        </div>
        <div class="d-none d-md-block">
          {{ scoreProp.creator.name }}
        </div>
      </div>
      <div v-else>
        {{ scoreProp.creator.name }}
      </div>

      <div class="fs-4 d-flex justify-content-center">
        <p class=" my-0 me-3 " title="Level">
          <span class="d-none d-md-inline ">Level:</span>
          {{ Math.round(scoreProp.creator.level) }}
        </p>
        <p class="my-0" title="Dragons">
          <span class="d-none d-md-inline ">Dragons:</span>
          {{ Math.round(scoreProp.creator.dragons) }}
        </p>
      </div>

    </div>
    <div class="col-4 col-md-4 fs-2 d-flex flex-column flex-md-column justify-content-center">
      <p class="my-0 ">
        Damage
      </p>
      <p class="my-0 ps-3">
        {{ Math.round(scoreProp.dmg) }}
      </p>
    </div>
  </section>
  <!-- </section> -->

</template>


<script>
import { AppState } from "../AppState.js";
import { computed } from 'vue'

export default {
  props: {
    scoreProp: { type: Object, required: true },
    index: { type: Number }
  },
  setup(props) {
    const accountIcon = computed(() => props.scoreProp.creator.picture);

    const bgIcon = computed(() => {
      const icon = accountIcon.value;
      if (!icon.includes('assets/player/player') && icon.length > 2) {
        return 'assets/player/player0.jpeg';
      } else {
        return icon;
      }
    });

    return {
      accountIcon,
      bgIcon

    }
  }
}
</script>


<style lang="scss" scoped>
.character-card {
  width: 70vw;
  // height: 120px;
  padding: 8px;
  font-weight: bold;
  background-color: var(--bs-background);
}

.card-icon {
  text-shadow: 2px 2px 16px black;
  text-shadow: -2px -2px 16px black;
}

.marquee {
  white-space: nowrap;
  position: relative;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  10% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-250%);
  }
}
</style>