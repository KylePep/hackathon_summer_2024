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
        <input v-model="editable.body" value="heal" class="form-check-input" type="radio" name="body" id="body4"
          checked>
        <label class="form-check-label" for="body4">
          Heal
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-success"> Give Assistance </button>
  </form>
  <!-- <form @submit.prevent="createAssistance()" class="d-flex">
    <textarea v-model="editable.body" name="body" id="body"></textarea>
    <button type="submit" class="btn btn-success">Create Assistance</button>
  </form> -->
</template>


<script>
import { assistancesService } from "../services/AssistancesService.js";
import Pop from "../utils/Pop.js";
import { ref } from 'vue'
export default {
  setup() {
    const editable = ref({})
    editable.value.roomId = 1

    return {
      editable,

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