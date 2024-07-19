<template>
  <section class="row g-3">
    <div class="col-12 d-flex flex-column align-items-center">
      <h1 class="bg-dark p-3 border border-1 border-light rounded-4 text-light">About World War Dragon</h1>
    </div>
    <div class="col-12 d-flex flex-column align-items-center ">
      <div class="bg-dark p-3 border border-1 border-light rounded-4 text-light">
        <h2>The world is at war with dragons</h2>
        <h3>From the sky appeared a mighty dragon in a blink of an eye.</h3>
        <p>From the gaping portal descended the dragon, In it's wake countless smaller dragons fell to earth. </p>
        <p>It is your duty to defeat these dragons and drive back the Immense dragon.</p>
        <p>You can not do this alone. You must rely and come to the aid of every warrior and citizen of centeria.
        </p>
        <p>Through everyone's combined might, the dragon will be repelled</p>
      </div>
    </div>
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
        let bgImg = '../public/assets/dragonPortal.jpeg';
        mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
      }
    }
    return {}
  }
}
</script>


<style lang="scss" scoped></style>