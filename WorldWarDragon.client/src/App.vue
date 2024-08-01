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
    color: var(--bs-text);
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
    --main-height: calc(100vh - 31px - 64px);
}

.text-2p {
    font-family: "Press Start 2P", system-ui;
}

.text-V {
    font-family: "VT323", system-ui;
}

.text-outline {
    text-shadow: 1px 1px 0 var(--bs-dark), 1px -1px 0 var(--bs-dark), -1px 1px 0 var(--bs-dark), -1px -1px 0 var(--bs-dark), 1px 0px 0 var(--bs-dark), 0px 1px 0 var(--bs-dark), -1px 0px 0 var(--bs-dark), 0px -1px 0 var(--bs-dark);
}

.text-outline-bg {
    text-shadow: 1px 1px 0 var(--bs-text-outline), 1px -1px 0 var(--bs-text-outline), -1px 1px 0 var(--bs-text-outline), -1px -1px 0 var(--bs-text-outline), 1px 0px 0 var(--bs-text-outline), 0px 1px 0 var(--bs-text-outline), -1px 0px 0 var(--bs-text-outline), 0px -1px 0 var(--bs-text-outline);
}
</style>