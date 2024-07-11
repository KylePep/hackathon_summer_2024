<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
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

main {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(https://img.freepik.com/free-photo/close-up-pattern-scales_23-2151365720.jpg?t=st=1720719961~exp=1720723561~hmac=1a603e1badaac615e7cd66a28b67d84cfefeb8f17eb21d18ee0347d58092fcc8&w=740);
    background-position: center;
    background-repeat: none;
    background-size: cover;
    background-attachment: fixed;
}

section:first-child {
    margin-top: 4rem;
}

::-webkit-scrollbar {
    display: none;
}

footer {
    // height: 32px;
}

// main {
//     display: flex;
// }

:root {
    --main-height: calc(100vh - 32px - 64px);
}
</style>