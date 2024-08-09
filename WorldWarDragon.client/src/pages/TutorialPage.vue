<template>
  <section class="row g-3 mx-5 text-V text-outline-bg">

    <div class="col-12 text-2p text-outline fs-1 fw-bold text-center ">
      Tutorial
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="col-12 px-0">
          <img class="img-fluid rounded-4" src="/assets/tutorial.jpeg" alt="">
        </div>
        <div class="col-12 lore-content p-3 pb-0">
          <h3>Welcome to World War Dragon!</h3>
          <p>An idle slasher with some community components.
          </p>
          <p>
            In World War Dragon you'll be fighting dragons, investing in boons for the areas of the map, offering
            assistance to other players with items and leveling up all while defeating a variety of dragons.
          </p>

        </div>
      </section>
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="order-2 order-md-1 col-12 col-md-12 lore-content p-3">
          <h3>Combat</h3>
          <p>After you have joined the fight and selected an area of the map ( Start with the safe zone). You can begin
            slashing at the dragon! Just move your cursor through the center of the dragon. Slash! that's all it takes.
          </p>
          <p>After combat you can be rewarded with gold and occasionally items.</p>
          <p>Items are the key to victory against strong foes.</p>
          <p>4 Crystals show up around the enemy when you have an item, click, drag, and draw symbols to use the three
            different items!</p>
        </div>

        <div class="order-1 order-md-2 col-12 col-md-6 px-0">
          <!-- <img class="img-fluid rounded-4" src="/assets/veteran.jpeg" alt=""> -->
        </div>
      </section>
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="col-12 col-md-12 px-0">
          <!-- <img class="img-fluid rounded-4" src="/assets/princess3.jpeg" alt=""> -->
        </div>

        <div class="col-12 col-md-12 lore-content p-3">
          <h3>Community!</h3>
          <p>In world war dragon players interact in two main ways, boons and assistance.</p>
          <p>Participating in the community will reward you with Valor, the experience used to level up in World War
            Dragon.</p>
          <p>Boons: A boon will effect every one fighting dragons in that area, for example purchasing a boon of health
            in Toleftios will give everyone fighting there an additional health point to face the dragon threat in that
            area!</p>
          <p>Assistance: Have an item you aren't using or want to help someone else out, In Centeria you can offer up
            your items. Other players can accept those items if they are needing a leg up. - Maybe you could farm up a
            bunch on lower levels to help the entire community on higher levels? </p>
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