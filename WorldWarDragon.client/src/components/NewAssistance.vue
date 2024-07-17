<template>
  <form @submit.prevent="createAssistance()" class="d-flex bg-dark p-3 rounded border border-3 border-light">
    <div class="pe-3">
      <div class="form-check">
        <input v-model="editable.body" value="attack" class="form-check-input" type="radio" name="body" id="body1"
          required>
        <label class="form-check-label" for="body1">
          Attack
        </label>
      </div>
      <div class="form-check">
        <input v-model="editable.body" value="shield" class="form-check-input" type="radio" name="body" id="body2">
        <label class="form-check-label" for="body2">
          Shield
        </label>
      </div>
      <div class="form-check">
        <input v-model="editable.body" value="heal" class="form-check-input" type="radio" name="body" id="body4">
        <label class="form-check-label" for="body4">
          Heal
        </label>
      </div>
    </div>
    <button v-if="account[editable.body] > 0" type="submit" class="btn btn-success"> Give Assist <br> +100
      valor</button>
    <div v-else class="btn btn-dark">Not enough Items </div>
  </form>
</template>


<script>
import { AppState } from "../AppState.js";
import { assistancesService } from "../services/AssistancesService.js";
import Pop from "../utils/Pop.js";
import { computed, ref } from 'vue'
export default {
  setup() {
    const editable = ref({})
    editable.value.roomId = 1

    return {
      editable,
      account: computed(() => AppState.account),
      async createAssistance() {
        try {
          const assistanceData = editable.value
          await assistancesService.createAssistance(assistanceData)
          editable.value = {}
          editable.value.roomId = 1
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>