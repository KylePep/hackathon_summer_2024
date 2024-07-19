<template>
  <section class="row g-3 mx-5 px-5">
    <div class="col-12 d-flex flex-column align-items-center">
      <h1 class="bg-dark p-3 border border-1 border-light rounded-4 text-light">About World War Dragon</h1>
    </div>
    <div class="col-12 d-flex flex-column align-items-center ">
      <div class="row bg-dark p-3 border border-1 border-light rounded-4 text-light">
        <div class="col-12 ">
          <h2>The world is at war with dragons</h2>

        </div>

      </div>
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row bg-dark border border-1 border-light rounded-4 text-light">
        <div class="col-6 px-0">
          <img class="img-fluid rounded-4" src="/assets/dragonPortal.jpeg" alt="">
        </div>
        <div class="col-6 p-3">
          <h3>From the sky appeared a mighty dragon in a blink of an eye.</h3>
          <p>From the gaping portal descended the dragon, In it's wake countless smaller dragons fell to the earth. </p>
          <p>It is your duty to defeat these dragons and drive back the Immense dragon.</p>
          <p>You can not do this alone. You must rely and come to the aid of every warrior and citizen of centeria.
          </p>
          <p>Through everyone's combined might, the dragon will be repelled</p>
        </div>
      </section>
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row bg-dark border border-1 border-light rounded-4 text-light">
        <div class="col-6 p-3">
          <h3>It is your duty to defeat these dragons and drive back the Immense dragon.</h3>
          <p>You can not do this alone. You must rely and come to the aid of every warrior and citizen of centeria.
          </p>
          <p>Through everyone's combined might, the dragon will be repelled</p>
        </div>

        <div class="col-6 px-0">
          <img class="img-fluid rounded-4" src="/assets/veteran.jpeg" alt="">
        </div>
      </section>
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row bg-dark border border-1 border-light rounded-4 text-light">
        <div class="col-6 px-0">
          <img class="img-fluid rounded-4" src="/assets/princess3.jpeg" alt="">
        </div>

        <div class="col-6 p-3">
          <h3>Under the authority of the young princess of Centeria.</h3>
          <p>March forth into the unknown territories and defeat any dragon unlucky enough to cross your path.</p>
        </div>

      </section>
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
        let bgImg = 'https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
      }
    }
    return {}
  }
}
</script>


<style lang="scss" scoped></style>