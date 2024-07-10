<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
import OffBar from './components/OffBar.vue'
</script>

<template>
    <header>
        <!-- <NavBar /> -->
        <OffBar />
    </header>
    <main class="container-fluid ">
        <RouterView />
    </main>

    <footer class="bg-dark">
    </footer>


</template>

<style lang="scss">
@import "./assets/scss/main.scss";

footer {
    height: 32px;
}

// main {
//     display: flex;
// }

:root {
    --main-height: calc(100vh - 32px - 64px);
}
</style>