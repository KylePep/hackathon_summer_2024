<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/Navbar.vue'
import OffBar from './components/OffBar.vue'
import { onMounted, ref, watchEffect } from "vue";
// const route = useRoute()
// const bgImg = ref()
// bgImg.value = '../public/assets/towerbg4.jpeg'

// onMounted(() => {
//     setBgImg(route)

// })

// // watchEffect(() => {
// //     setBgImg(route)
// // })

// const setBgImg = () => {
//     if (route.name === 'Home') {
//         bgImg.value = '../public/assets/towerbg4.jpeg';
//     } else if (route.name === 'Score') {
//         bgImg.value = '../public/assets/dragonCave2.jpeg';
//     }
// };

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
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url('../public/assets/towerbg4.jpeg');
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