<template>
  <form @submit.prevent="createMessage()" class="d-flex bg-dark p-3 rounded border border-3 border-light">
    <div class="pe-3">
      <div class="form-check">
        <input v-model="editable.boon" value="gold" class="form-check-input" type="radio" name="boon" id="boon1"
          required>
        <label class="form-check-label" for="boon1">
          Gold
        </label>
      </div>
      <div class="form-check">
        <input v-model="editable.boon" value="health" class="form-check-input" type="radio" name="boon" id="boon2">
        <label class="form-check-label" for="boon2">
          Health
        </label>
      </div>
      <div class="form-check">
        <input v-model="editable.boon" value="luck" class="form-check-input" type="radio" name="boon" id="boon3">
        <label class="form-check-label" for="boon3">
          Luck
        </label>
      </div>
      <div class="form-check">
        <input v-model="editable.boon" value="power" class="form-check-input" type="radio" name="boon" id="boon4">
        <label class="form-check-label" for="boon4">
          Power
        </label>
      </div>
    </div>
    <div>
      <select required name="category" id="category" v-model="editable.body">
        <option value="For Honor!" required>For Honor!</option>
        <option value="For Glory!" required>For Glory!</option>
        <option value="For Centeria!" required>For Centeria!</option>
        <option value="Dragons!" required>Dragons!</option>
        <option value="FIGHT! WIN!" required>FIGHT! WIN!</option>
        <option value="It's dangerous to go alone" required>It's dangerous to go alone</option>
      </select>
    </div>
    <button v-if="gold > messageProp.cost" type="submit" class="btn btn-success"> Create Boon <br>
      Gold: {{ messageProp.cost }} </button>
    <div v-else class="btn btn-dark">Not enough Gold <br> Gold: {{ messageProp.cost }}</div>
  </form>
</template>


<script>
import { AppState } from "../AppState.js";
import { messagesService } from "../services/MessagesService.js";
import Pop from "../utils/Pop.js";
import { computed, ref } from 'vue'
export default {
  props: {
    messageProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const editable = ref({})
    editable.value.roomId = 1

    return {
      editable,
      gold: computed(() => AppState.account.gold),
      async createMessage() {
        try {
          const cost = props.messageProp.cost
          const messageData = editable.value
          messageData.roomId = AppState.activeRoom.id
          await messagesService.createMessage(messageData, cost)
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