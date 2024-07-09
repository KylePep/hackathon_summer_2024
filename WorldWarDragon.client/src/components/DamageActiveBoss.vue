<template>
  <form @submit.prevent="createOrIncreaseBossDamage()" class="d-flex">
    <input type="number">
    <button class="btn btn-success">Damage Boss</button>
  </form>
</template>


<script>
import { bossDamageService } from "../services/BossDamageService.js";
import Pop from "../utils/Pop.js";
import { ref } from 'vue'
export default {
  setup() {
    const editable = ref({})
    editable.value.active = true

    return {
      editable,

      async createOrIncreaseBossDamage() {
        try {
          const bossData = editable.value
          bossData.bossId = activeBoss.id
          await bossService.createOrIncreaseBossDamage(bossData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      },
      activeBoss: computed(() => AppState.activeBoss),
    }
  }
}
</script>


<style lang="scss" scoped></style>