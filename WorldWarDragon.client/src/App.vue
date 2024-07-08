<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
</script>

<template>
    <header>
        <NavBar />
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