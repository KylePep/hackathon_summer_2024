<template>
  <form @submit.prevent="createAssistance()" class="d-flex">
    <textarea v-model="editable.body" name="body" id="body"></textarea>
    <button type="submit" class="btn btn-success">Create Assistance</button>
  </form>
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