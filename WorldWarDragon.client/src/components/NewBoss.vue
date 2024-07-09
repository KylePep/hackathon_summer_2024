<template>
  <img :src="editable.image" alt="">
  <form @submit.prevent="createBoss()" class="d-flex">
    <input v-model="editable.name" name="name" id="name" placeholder="NAME"></input>
    <input v-model="editable.hp" name="hp" id="hp" placeholder="HP"></input>
    <input v-model="editable.image" name="image" id="image" placeholder="IMAGE"></input>
    <input v-model="editable.active" type="checkbox" name="active" id="active"></input>
    <button type="submit" class="btn btn-success">Create Boss</button>
  </form>
</template>


<script>
import { bossService } from "../services/BossService.js";
import Pop from "../utils/Pop.js";
import { ref } from 'vue'
export default {
  setup() {
    const editable = ref({})
    editable.value.active = true

    return {
      editable,

      async createBoss() {
        try {
          const bossData = editable.value
          await bossService.createBoss(bossData)
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