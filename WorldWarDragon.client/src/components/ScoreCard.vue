<template>
  <div class="d-flex justify-content-center text-light">
    <div class="character-card border border-1 border-light rounded ">
      <img class="character-icon" :src="scoreProp?.creator.picture" alt="">
      <div class="fs-1">
        {{ index + 1 }} {{ scoreProp.creator.name }}

        <div class="fs-4 d-flex">
          <p class=" my-0 me-3 ">
            Level: {{ Math.round(scoreProp.creator.level) }}
          </p>
          <p class="my-0">
            Valor: {{ Math.round(scoreProp.creator.valor) }}
          </p>
        </div>

      </div>
      <div class="fs-2 d-flex flex-column justify-content-center">
        <p class="my-0">
          Damage
        </p>
        <p class="my-0 text-center">
          {{ Math.round(scoreProp.dmg) }}
        </p>
      </div>
    </div>
  </div>

</template>


<script>
export default {
  props: {
    scoreProp: { type: Object, required: true },
    index: { type: Number }
  },
  setup(props) {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.character-card {
  width: 70vw;
  height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.478);

}

.character-icon {
  border-radius: 4px;
  height: auto;
  width: auto;
}
</style>