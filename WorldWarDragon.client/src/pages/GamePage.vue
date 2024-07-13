<script setup>
import Phaser from 'phaser';
import { onMounted, ref, toRaw } from 'vue';
import PhaserGame from './game/PhaserGame.vue';
import Pop from "../utils/Pop.js";
import { messagesService } from "../services/MessagesService.js";

onMounted(() => {
  setBgImg();
  getMessages();
});

async function getMessages() {
  try {
    await messagesService.getMessages()
  } catch (error) {
    Pop.error(error.message)
  }
}


const setBgImg = () => {
  const mainElement = document.querySelector('main');
  if (mainElement) {
    let bgImg = 'https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
  }
}

// The sprite can only be moved in the MainMenu Scene
const canMoveSprite = ref();

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
const spritePosition = ref({ x: 0, y: 0 });

const changeScene = () => {

  const scene = toRaw(phaserRef.value.scene);

  if (scene) {
    //  Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
    scene.changeScene();
  }

}

const moveSprite = () => {

  const scene = toRaw(phaserRef.value.scene);

  if (scene) {
    //  Call the `moveLogo` method in the `MainMenu` Scene and capture the sprite position
    scene.moveLogo(({ x, y }) => {

      spritePosition.value = { x, y };

    });
  }

}

const addSprite = () => {

  const scene = toRaw(phaserRef.value.scene);

  if (scene) {
    //  Add a new sprite to the current scene at a random position
    const x = Phaser.Math.Between(64, scene.scale.width - 64);
    const y = Phaser.Math.Between(64, scene.scale.height - 64);

    //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
    const star = scene.add.sprite(x, y, 'star');

    //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
    //  You could, of course, do this from within the Phaser Scene code, but this is just an example
    //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
    scene.add.tween({
      targets: star,
      duration: 500 + Math.random() * 1000,
      alpha: 0,
      yoyo: true,
      repeat: -1
    });
  }

}

//  This event is emitted from the PhaserGame component:
const currentScene = (scene) => {

  canMoveSprite.value = (scene.scene.key !== 'MainMenu');

}
</script>

<template>
  <div class="container-fluid ">
    <div class="row pt-3">
      <div class="game-window col-12 ">
        <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
      </div>
      <!-- <div
        class="col-12 col-md-3 bg-primary rounded  d-flex flex-row flex-md-column justify-content-center align-items-center">
        <div>
          <button class="btn btn-dark" @click="changeScene">Change Scene</button>
        </div>
        <div>
          <button :disabled="canMoveSprite" class="btn btn-dark" @click="moveSprite">Toggle Movement</button>
        </div>
        <div class="spritePosition text-light">Sprite Position:
          <pre>{{ spritePosition }}</pre>
        </div>
        <div>
          <button class="btn btn-dark" @click="addSprite">Add New Sprite</button>
        </div>
      </div> -->
    </div>

  </div>
</template>

<style>
.game-window {
  padding: 0;
  /* max-height: calc(100vh - 96px); */
}
</style>