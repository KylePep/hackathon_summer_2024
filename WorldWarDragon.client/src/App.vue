<script setup>
import { RouterView, useRoute } from 'vue-router'
import OffBar from './components/OffBar.vue'

</script>

<template>
    <header>
        <OffBar />
    </header>
    <main class="container-fluid">
        <RouterView />
    </main>

    <footer class="bg-dark">
    </footer>


</template>

<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Jacquard+24&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Iceberg&display=swap');
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap');

main {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url('/assets/towerbg4.jpeg');
    background-position: center;
    background-repeat: none;
    background-size: cover;
    background-attachment: fixed;
    user-select: none;
}

header {
    user-select: none;
}

section:first-child {
    margin-top: 4rem;
}

::-webkit-scrollbar {
    display: none;
}

:root {
    --main-height: calc(100vh - 32px - 64px);
}
</style>