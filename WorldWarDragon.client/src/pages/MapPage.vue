<template>

  <section class="row">
    <div class="col-12 fs-1 fw-bold text-center text-light mt-3 mb-5">
      <h1 v-if="!activeRoom.name || activeRoom.id == 0" class="fs-1 fw-bold text-center text-light">
        Select an area
      </h1>
      <h1 v-else class="fs-1 fw-bold text-center text-light ">
        {{ activeRoom.name }}
      </h1>
    </div>
  </section>

  <section v-if="!activeRoom.name || activeRoom.id == 0" class="row position-relative map mx-auto mx-3">
    <div @click="setActiveRoom(5)" class="position-absolute top-50 start-50 translate-middle map-section map-center">
      Centeria</div>
    <div @click="setActiveRoom(1)" class="col-6 map-section">Toleftios</div>
    <div @click="setActiveRoom(2)" class="col-6 map-section">Rysto</div>
    <div @click="setActiveRoom(3)" class="col-6 map-section">Lendbom</div>
    <div @click="setActiveRoom(4)" class="col-6 map-section">Boghir</div>
  </section>
  <section v-else class="row d-flex justify-content-center  text-center">
    <div class="col-12">
      <button @click="setActiveRoom(0)" class=" btn btn-dark border border-1 border-light">TO MAP</button>
    </div>


    <div v-if="activeRoom.id != 5" class=" col-12 d-flex flex-column justify-content-center align-items-center">
      <section class="row">

        <div class="col-12">
          <h2 class="text-light">BOONS</h2>
          <div class="text-light">
            <h4>
              Gold: {{ AppState.goldMod[activeRoom.id] }} | Health: {{ AppState.healthMod[activeRoom.id] }} | Luck: {{
                AppState.luckMod[activeRoom.id] }}
              | Power: {{
                AppState.powerMod[activeRoom.id] }}
            </h4>
          </div>
        </div>


        <div class="col-12">
          <NewMessage :messageProp="{ cost: 100 * activeRoom.difficulty }" />
          <div v-for="message in messages" :key="message.id"
            class="bg-dark text-light px-3 rounded border border-light">
            {{ message.boon }}
            {{ message.body }}
            {{ message.roomId }}
            {{ message?.creator?.name }}
          </div>

        </div>
        <!-- <div class="col-6 bg-dark border border-light rounded fs-5 fw-bold text-start">
          <p>
            Dragons defeated: 0000

          </p>
          <p>
            Damage done to boss Dragon: 0000

          </p>
          <p>
            Gold collected: 0000

          </p>
          <p>
            Gold lost: 0000

          </p>

          <p>
            Losses: 0000
          </p>
        </div> -->

      </section>
    </div>


    <div v-else class="col-12 d-flex flex-column justify-content-center align-items-center">
      <h2 class="text-light">Assistance</h2>
      <NewAssistance />
      <div class="d-flex">
        <div>
          <div v-for="assistance in assistancesUnclaimed" :key="assistance.id"
            class="bg-dark px-3 rounded border border-light"
            :class="[assistance.claim == false ? 'text-success' : 'text-danger']">
            {{ assistance.body }}
            <!-- {{ assistance.roomId }} -->
            {{ assistance?.creator?.name }}
            <button v-if="assistance.creatorId != account.id && assistance
              .claim == false" class="selectable mdi mdi-sword btn text-success" @click="
                claimAssistance(assistance.id)"> Claim</button>
          </div>
        </div>
        <div>
          <div v-for="assistance in assistancesClaimed.slice(0, 5)" :key="assistance.id"
            class="bg-dark px-3 rounded border border-light"
            :class="[assistance.claim == false ? 'text-success' : 'text-danger']">
            {{ assistance.body }}
            <!-- {{ assistance.roomId }} -->
            {{ assistance?.creator?.name }}
            <button v-if="assistance.creatorId == account.id && assistance
              .claim == false" class="selectable mdi mdi-download btn text-success" @click="
                claimAssistance(assistance.id)"> Claim</button>
          </div>

        </div>

      </div>
    </div>
  </section>

</template>


<script>
import { AppState } from "../AppState.js";
import { computed, onMounted, onUnmounted } from "vue";
import { MAP_DATA } from '../../../shared/constants/index.js'
import Pop from "../utils/Pop.js";
import { assistancesService } from "../services/AssistancesService.js";
import { messagesService } from "../services/MessagesService.js";
import { logger } from "../utils/Logger.js";
import NewMessage from "../components/NewMessage.vue";
import NewAssistance from "../components/NewAssistance.vue";


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
      AppState.activeRoom = {}
    });
    onUnmounted(() => {
      setActiveRoom(0)
    })

    let bgImg = 'https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const setBgImg = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
      }

    }

    function setBg(roomId) {
      if (roomId != 0) {
        bgImg = AppState.activeRoom.bgImage
      }
      else {
        bgImg = 'https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
      setBg(roomId)
      setBgImg()
    }
    return {
      messages: computed(() => AppState.messages.filter((m) => m.roomId == AppState.activeRoom.id)),
      assistancesUnclaimed: computed(() => AppState.assistances.filter((a) => a.claim == false)),
      assistancesClaimed: computed(() => AppState.assistances.filter((a) => a.claim == true)),
      activeRoom: computed(() => AppState.activeRoom),
      account: computed(() => AppState.account),
      AppState: computed(() => AppState),

      setActiveRoom,

      async deleteMessage(messageId) {
        try {
          const confirmDelete = await Pop.confirm('Delete?')
          if (!confirmDelete) {
            return
          }
          await messagesService.deleteMessage(messageId)
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      },
      async deleteAssistance(assistanceId) {
        try {
          const confirmDelete = await Pop.confirm('Delete?')
          if (!confirmDelete) {
            return
          }
          await assistancesService.deleteAssistance(assistanceId)
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      },
      async claimAssistance(assistanceId) {
        try {
          const confirmClaim = await Pop.confirm('Claim?')
          if (!confirmClaim) {
            return
          }
          await assistancesService.claimAssistance(assistanceId)
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      },


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
  max-width: 1024px;
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
