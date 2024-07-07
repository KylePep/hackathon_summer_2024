<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
</script>

<template>
    <header>
        <NavBar />
    </header>
    <main class="container-fluid">
        <RouterView />
    </main>

    <footer>
    </footer>


</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
    --main-height: calc(100vh - 32px - 64px);
}
</style>