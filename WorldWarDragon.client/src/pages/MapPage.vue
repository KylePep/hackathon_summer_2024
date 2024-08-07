<template>

  <section class="row">
    <div class="col-12 fs-1 fw-bold text-center text-light mt-3 mb-5 text-2p text-outline">
      <h1 v-if="!activeRoom.name || activeRoom.id == 0" class="fs-1 fw-bold text-center text-light">
        Select an area
      </h1>
      <h1 v-else class="fs-1 fw-bold text-center text-light ">
        {{ activeRoom.name }}
      </h1>
    </div>
  </section>

  <section v-if="!activeRoom.name || activeRoom.id == 0"
    class="row position-relative map text-2p text-outline mx-auto mx-3">
    <div @click="setActiveRoom(5)" class="position-absolute top-50 start-50 translate-middle map-section map-center">
      Centeria
      <br>
      Assistance
    </div>
    <div @click="setActiveRoom(1)" class="col-6 map-section">
      Toleftios
      <section class="row ">
        <i class="col-12 col-md-6 mdi mdi-circle-multiple">: {{ AppState.goldMod[1] }}</i>
        <i class="col-12 col-md-6 mdi mdi-heart">: {{ AppState.healthMod[1] }}</i>
        <i class="col-12 col-md-6 mdi mdi-clover">: {{ AppState.luckMod[1] }}</i>
        <i class="col-12 col-md-6 mdi mdi-weight-lifter">: {{ AppState.powerMod[1] }}</i>
      </section>
    </div>
    <div @click="setActiveRoom(2)" class="col-6 map-section">
      Rysto
      <section class="row">
        <i class="col-12 col-md-6 mdi mdi-circle-multiple">: {{ AppState.goldMod[2] }}</i>
        <i class="col-12 col-md-6 mdi mdi-heart">: {{ AppState.healthMod[2] }}</i>
        <i class="col-12 col-md-6 mdi mdi-clover">: {{ AppState.luckMod[2] }}</i>
        <i class="col-12 col-md-6 mdi mdi-weight-lifter">: {{ AppState.powerMod[2] }}</i>
      </section>
    </div>
    <div @click="setActiveRoom(3)" class="col-6 map-section">
      Lendbom
      <section class="row">
        <i class="col-12 col-md-6 mdi mdi-circle-multiple">: {{ AppState.goldMod[3] }}</i>
        <i class="col-12 col-md-6 mdi mdi-heart">: {{ AppState.healthMod[3] }}</i>
        <i class="col-12 col-md-6 mdi mdi-clover">: {{ AppState.luckMod[3] }}</i>
        <i class="col-12 col-md-6 mdi mdi-weight-lifter">: {{ AppState.powerMod[3] }}</i>
      </section>
    </div>
    <div @click="setActiveRoom(4)" class="col-6 map-section">
      Boghir
      <section class="row">
        <i class="col-12 col-md-6 mdi mdi-circle-multiple">: {{ AppState.goldMod[4] }}</i>
        <i class="col-12 col-md-6 mdi mdi-heart">: {{ AppState.healthMod[4] }}</i>
        <i class="col-12 col-md-6 mdi mdi-clover">: {{ AppState.luckMod[4] }}</i>
        <i class="col-12 col-md-6 mdi mdi-weight-lifter">: {{ AppState.powerMod[4] }}</i>
      </section>
    </div>
  </section>

  <section v-else class="row d-flex justify-content-center text-2p text-outline text-center">
    <div class="col-12">
      <button @click="setActiveRoom(0)" class=" btn room-container text-outline-bg ">TO
        MAP</button>
    </div>


    <div v-if="activeRoom.id != 5" class=" col-12 d-flex flex-column justify-content-center align-items-center">
      <section class="row">

        <div class="col-10 mx-auto boons text-outline text-light">
          <h2 class="mb-4">BOONS</h2>
          <div class="mb-3 fs-6">
            <span>
              Gold: {{ AppState.goldMod[activeRoom.id] }}
            </span>
            <span>
              Health: {{ AppState.healthMod[activeRoom.id] }}
            </span>
            <span>
              Luck: {{ AppState.luckMod[activeRoom.id] }}
            </span>
            <span>
              Power: {{ AppState.powerMod[activeRoom.id] }}
            </span>



          </div>
        </div>


        <div class="col-11 mx-auto ">
          <NewMessage :messageProp="{ cost: 100 * activeRoom.difficulty }" />
          <div class="message-container border border-2 border-light rounded">
            <div v-for="message in messages" :key="message.id"
              class="room-container text-outline-bg px-3 d-flex justify-content-between align-items-center">
              <div>
                <i :class="message.boon == 'power' ? 'mdi mdi-weight-lifter' : 'd-none'"></i>
                <i :class="message.boon == 'luck' ? 'mdi mdi-clover' : 'd-none'"></i>
                <i :class="message.boon == 'health' ? 'mdi mdi-heart' : 'd-none'"></i>
                <i :class="message.boon == 'gold' ? 'mdi mdi-circle-multiple' : 'd-none'"></i>
                <div class="d-none d-md-inline ps-3">
                  {{ message.boon }}
                </div>
              </div>
              <div class="ps-2">{{ message.body }}</div>
              <div class="ps-2">{{ message?.creator?.name }}</div>

            </div>
          </div>

        </div>
        <!-- <div class="col-6 room-container border border-light rounded fs-5 fw-bold text-start">
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
      <h2 class="text-light my-4">Assistance</h2>
      <NewAssistance />
      <div class="d-flex">
        <div>
          <div v-for="assistance in uniqueUnclaimedAssistances" :key="assistance.id"
            class="room-container px-3 d-flex align-items-center justify-content-between text-success py-1">
            {{ assistance.body }}
            {{ assistance?.creator?.name }}
            <button v-if="account?.id && assistance.creatorId != account?.id && assistance
              .claim == false" class="selectable btn py-0" @click="
                claimAssistance(assistance.id)">
              <i class="mdi mdi-download"></i>
              Claim</button>
          </div>
        </div>
        <div class="ms-3">
          <div v-for="assistance in uniqueClaimedAssistances" :key="assistance.id"
            class="room-container px-3 text-danger d-flex justify-content-between align-items-center">
            {{ assistance.body }}
            {{ assistance?.creator?.name }}
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
      }
      setBg(roomId)
      setBgImg()
    }
    return {
      messages: computed(() => AppState.messages.filter((m) => m.roomId == AppState.activeRoom.id).reverse()),

      activeRoom: computed(() => AppState.activeRoom),
      account: computed(() => AppState.account),
      AppState: computed(() => AppState),

      uniqueUnclaimedAssistances: computed(() => {
        const seen = new Set();
        const assistancesClaimed = AppState.assistances.filter((a) => a.claim == false)
        return assistancesClaimed.filter(assistance => {
          const key = `${assistance.creator.name}-${assistance.body}`;
          if (!seen.has(key)) {
            seen.add(key);
            return true;
          }
          return false;
        });
      }),

      uniqueClaimedAssistances: computed(() => {
        const seen = new Set();
        const assistancesClaimed = AppState.assistances.filter((a) => a.claim == true)
        return assistancesClaimed.filter(assistance => {
          const key = `${assistance.creator.name}-${assistance.body}`;
          if (!seen.has(key)) {
            seen.add(key);
            return true;
          }
          return false;
        });
      }),

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
  font-size: 2vh;
  background-image: url('/assets/map4.jpeg');
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

  >section {
    margin-top: 1rem;
  }
}

.map-section:hover {
  text-shadow: 3px 3px 5px black;
  background: radial-gradient(circle, rgba(250, 248, 233, 0.7008547008547008) 0%, rgba(248, 246, 225, 0.396011396011396) 17%, rgba(255, 255, 255, 0) 55%, rgba(58, 64, 73, 0) 100%, rgba(255, 255, 255, 0) 100%);
}

.room-size {
  max-height: 100vh;
}

.room-container {
  background-color: var(--bs-body-bg);
  border: solid 1px var(--bs-outline);
  border-radius: 4px;
}

.message-container {
  overflow-y: auto;
  max-height: 33vh;
}

.boons {
  font-size: .1rem;
}
</style>
