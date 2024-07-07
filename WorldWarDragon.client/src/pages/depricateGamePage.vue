<template>
  <div class="background">
    Game Screen?
  </div>
  <GameScreen />
</template>


<script>
import GameScreen from './GameScreen.vue'
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.background {
  background-color: red;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>