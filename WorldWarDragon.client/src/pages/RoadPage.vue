<template>
  <section class="row g-3 mx-5 text-V text-outline-bg">

    <div class="col-12 text-2p text-outline fs-1 fw-bold text-center ">
      World War Dragon - Road Map
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="col-12 col-md-6 px-0">
          <!-- <img class="img-fluid rounded-4" src="/assets/dragonPortal.jpeg" alt=""> -->
        </div>
        <div class="col-12 col-md-12 lore-content p-3 pb-0">
          <h3>Road Map</h3>
          <p>
            At present World War Dragon is mostly done, that being said enough is never enough.
          </p>

          <ul>
            <li>
              Code Clean up
            </li>
            <li>
              Unlocks and rewards
            </li>
            <li>
              Weapon system
            </li>
            <li>
              Class system
            </li>
          </ul>

          <p>
            Listed in no particular order as they are not set in stone at this moment.
          </p>
        </div>
      </section>
    </div>

    <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="order-2 order-md-1 col-12 col-md-12 lore-content p-3">
          <h3>Change log</h3>
          <p>
            8/9/24 - New account system, When a new account is made the recruit name and image are automatically
            assigned.<br>
            Created Road Map and change log page <br>
            Created Tutorial Page, new players are automatically directed to after sign up.
          </p>
        </div>

        <div class="order-1 order-md-2 col-12 col-md-6 px-0">
          <!-- <img class="img-fluid rounded-4" src="/assets/veteran.jpeg" alt=""> -->
        </div>
      </section>
    </div>

    <!-- <div class="col-12 d-flex flex-column align-items-center">
      <section class="row lore-card border border-2 border-light rounded-4 ">
        <div class="col-12 col-md-12 px-0">
          <img class="img-fluid rounded-4" src="/assets/princess3.jpeg" alt="">
        </div>

        <div class="col-12 col-md-6 lore-content p-3">
          <h3>Credits etc</h3>
          <p>

          </p>
        </div>

      </section>
    </div> -->
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