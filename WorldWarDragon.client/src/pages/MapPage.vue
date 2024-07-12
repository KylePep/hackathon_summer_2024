<template>
  <section class="row">
    <div class="col-12 fs-1 fw-bold text-center text-light">
      Map PAGE
    </div>
  </section>
  <section class="row map mx-3">
    <div class="col-6 map-section">ToLeftios</div>
    <div class="col-6 map-section">RyTosend</div>
    <div class="col-6 map-section">LendBom</div>
    <div class="col-6 map-section">Boghir</div>
  </section>
</template>


<script>
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      setBgImg();
    });

    const setBgImg = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        let bgImg = '';
        mainElement.style.backgroundImage = ` url(${bgImg})`;
      }
    }
    return {}
  }
}
</script>


<style lang="scss" scoped>
.map {
  font-size: 32px;
  background-image: url('../public/assets/map4.jpeg');
  background-position: center;
  background-repeat: none;
  background-size: cover;

  width: auto;
  height: 512px;

}

.map-section {
  text-align: center;
  font-weight: bolder;
  color: white;
  flex-grow: 1;
  transition: all 300ms ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.map-section:hover {
  text-shadow: 3px 3px 5px black;
  background: radial-gradient(circle, rgba(250, 248, 233, 0.7008547008547008) 0%, rgba(248, 246, 225, 0.396011396011396) 17%, rgba(255, 255, 255, 0) 55%, rgba(58, 64, 73, 0) 100%, rgba(255, 255, 255, 0) 100%);
}
</style>
