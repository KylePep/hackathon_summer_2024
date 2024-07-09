<template>
  <form @submit.prevent="">
    <textarea v-model="editable.body" name="body" id="body"></textarea>
    <button type="submit" class="btn btn-success">Create Message</button>
  </form>
</template>


<script>
import { messagesService } from "@/services/MessagesService.js";
import Pop from "@/utils/Pop.js";
import { ref } from 'vue'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,

      async createMessage() {
        try {
          const messageData = editable.value
          const message = await messagesService.createMessage(messageData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>