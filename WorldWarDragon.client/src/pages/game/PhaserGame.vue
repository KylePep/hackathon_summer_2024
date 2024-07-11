<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus } from './EventBus';
import StartGame from './main';
import { router } from "../../router.js";
import { logger } from "../../utils/Logger.js";

// Save the current scene instance
const scene = ref();
const game = ref();

const emit = defineEmits(['current-active-scene']);

onMounted(() => {

    game.value = StartGame('game-container');

    EventBus.on('current-scene-ready', (currentScene) => {

        emit('current-active-scene', currentScene);

        scene.value = currentScene;

    });

    EventBus.on('navigate-home', () => {
        logger.log('go Home')
        router.push('/');
    });

});

onUnmounted(() => {

    if (game.value) {
        game.value.destroy(true);
        game.value = null;
    }

});

defineExpose({ scene, game });
</script>

<template>
    <div id="game-container"></div>
</template>