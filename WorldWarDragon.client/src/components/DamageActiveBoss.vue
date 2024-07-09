<template>
  <form @submit.prevent="createOrIncreaseBossDamage()" class="d-flex">
    <input v-model="editable.dmg" type="number">
    <button class="btn btn-success">Damage {{ activeBoss.name }}</button>
  </form>
</template>


<script>
import { bossDamageService } from "../services/BossDamageService.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { ref, computed } from 'vue'
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const editable = ref({})

    return {
      editable,
      activeBoss: computed(() => AppState.activeBoss),

      async createOrIncreaseBossDamage() {
        try {
          const bossData = editable.value
          bossData.bossId = this.activeBoss.id
          logger.log(bossData)
          await bossDamageService.createOrIncreaseBossDamage(bossData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped></style>