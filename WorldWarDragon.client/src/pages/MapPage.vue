<template>
  <section class="row">
    <div class="col-12 fs-1 fw-bold text-center text-light mb-5">
      <h1 v-if="!activeRoom.name || activeRoom.id == 0" class="fs-1 fw-bold text-center text-light">
        Select an area
      </h1>
      <h1 v-else class="fs-1 fw-bold text-center text-light">
        {{ activeRoom.name }}
      </h1>
    </div>
  </section>
  <section v-if="!activeRoom.name || activeRoom.id == 0" class="row position-relative map mx-3">
    <div @click="setActiveRoom(5)" class="position-absolute top-50 start-50 translate-middle map-section map-center">
      Centeria</div>
    <div @click="setActiveRoom(1)" class="col-6 map-section">Toleftios</div>
    <div @click="setActiveRoom(2)" class="col-6 map-section">Rysto</div>
    <div @click="setActiveRoom(3)" class="col-6 map-section">Lendbom</div>
    <div @click="setActiveRoom(4)" class="col-6 map-section">Boghir</div>
  </section>
  <section v-else class="row d-flex justify-content-center  text-center">
    <button @click="setActiveRoom(0)" class="btn btn-primary">Back</button>
    <div v-if="activeRoom.id != 5">
      Messages
      <div v-for="message in messages" :key="message.id">
        {{ message.body }}
        {{ message.roomId }}
        {{ message?.creator?.name }}
      </div>
    </div>
    <div v-else>
      Assistances
      <div v-for="assistance in assistances" :key="assistance.id">
        {{ assistance.body }}
        {{ assistance.roomId }}
        {{ assistance?.creator?.name }}
      </div>
    </div>
  </section>

</template>


<script>
import { AppState } from "../AppState.js";
import { computed, onMounted } from "vue";
import { MAP_DATA } from '../../../shared/constants/index.js'
import Pop from "../utils/Pop.js";
import { assistancesService } from "../services/AssistancesService.js";
import { messagesService } from "../services/MessagesService.js";
import { logger } from "../utils/Logger.js";


export default {
  setup() {
    async function getMessages() {
      try {
        await messagesService.getMessages()
      } catch (error) {
        Pop.error(error.message)
      }
    }



    async function getAssistances() {
      try {
        await assistancesService.getAssistances()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getMessages()
      getAssistances()
      setBgImg();
    });

    const setBgImg = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        let bgImg = 'https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        mainElement.style.backgroundImage = ` url(${bgImg})`;
      }

    }
    function setActiveRoom(roomId) {
      if (roomId != 0) {
        AppState.activeRoom = MAP_DATA.find((m) => m.id == roomId);
      }
      else {
        AppState.activeRoom = { id: 0 }
        logger.log('clicked', AppState.activeRoom)
      }
    }
    return {
      messages: computed(() => AppState.messages.filter((m) => m.roomId == AppState.activeRoom.id)),
      assistances: computed(() => AppState.assistances),
      activeRoom: computed(() => AppState.activeRoom),

      setActiveRoom,


    }
  }
}
</script>


<style lang="scss" scoped>
.map {
  font-size: 32px;
  background-image: url('../public/assets/map4.jpeg');
  background-position: center;
  background-repeat: none;
  background-size: cover;

  width: auto;
  height: 512px;

}

.map-center {
  width: 50%;
}

.map-section {
  cursor: pointer;
  text-align: center;
  font-weight: bolder;
  color: white;
  flex-grow: 1;
  transition: all 300ms ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.map-section:hover {
  text-shadow: 3px 3px 5px black;
  background: radial-gradient(circle, rgba(250, 248, 233, 0.7008547008547008) 0%, rgba(248, 246, 225, 0.396011396011396) 17%, rgba(255, 255, 255, 0) 55%, rgba(58, 64, 73, 0) 100%, rgba(255, 255, 255, 0) 100%);
}
</style>
