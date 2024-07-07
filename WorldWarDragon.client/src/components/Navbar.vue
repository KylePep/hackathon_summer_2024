<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3"> -->
  <div class="nav-bar ">
    <Login />



    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <!-- <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li> -->
    <!-- <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link> -->
    <!-- </li>
      </ul> -->
    <!-- LOGIN COMPONENT HERE -->
    <!-- </div> -->
  </div>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .nav-bar {
    height: calc(100vh - 32px);
  }

  .stickyTop {
    position: sticky;
    top: 0;
  }
}



a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
