<template>
  <section class="row g-3 mx-5 text-V text-outline-bg">

    <div class="col-12 text-2p text-outline fs-1 fw-bold text-center ">
      The World is at war with DRAGONS
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="col-12 col-md-6 px-0">
          <img class="img-fluid rounded-4" src="/assets/dragonPortal.jpeg" alt="">
        </div>
        <div class="col-12 col-md-6 lore-content p-3 pb-0">
          <h3>In the sky a mighty dragon appeared</h3>
          <p>With a blink of an eye, from the gaping portal, descended an enormous dragon.
          </p>
          <p>
            In it's wake countless
            smaller
            dragons fell to the earth.
          </p>

        </div>
      </section>
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="order-2 order-md-1 col-12 col-md-6 lore-content p-3">
          <h3>It is your duty to defeat these dragons and drive back the Immense dragon.</h3>
          <p>You can not do this alone. You must rely and come to the aid of every warrior and citizen of centeria.
          </p>
          <p>Through everyone's combined might, the dragon will be repelled!</p>
        </div>

        <div class="order-1 order-md-2 col-12 col-md-6 px-0">
          <img class="img-fluid rounded-4" src="/assets/veteran.jpeg" alt="">
        </div>
      </section>
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="col-12 col-md-6 px-0">
          <img class="img-fluid rounded-4" src="/assets/princess3.jpeg" alt="">
        </div>

        <div class="col-12 col-md-6 lore-content p-3">
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


<style lang="scss" scoped>
.lore-content {
  >h3 {
    font-weight: bold;
  }

  >p {
    font-size: x-large;
    padding: 8px;
  }
}

.lore-card {
  background-color: var(--bs-body-bg);
  max-width: 1200px;
}
</style>