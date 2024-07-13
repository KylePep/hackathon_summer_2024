<template>
  <section class="row g-3">

    <div class="col-12">
      <img :src="activeBoss.image" class="img-fluid" alt="">
      {{ activeBoss.image }}
      <h1>{{ activeBoss.name }}</h1>
      <h2>{{ activeBoss.hp - activeBoss.damages }}</h2>
      <DamageActiveboss />
      <NewBoss />
      <p>A list of all bosses</p>
      <div v-for="boss in bosses" :key="boss.id">
        boss: {{ boss.name }} | {{ boss.hp }} <button @click="setBossActivity(boss.id)"
          class="btn btn-secondary">activate: {{ boss.active }}</button>
      </div>
    </div>
    <div class="col-12">
      <p>For testing creating messages</p>
      <NewMessage :messageProp="{ cost: 100 * 0 }" />
      <p>Messages will be made with a preselected vocab or emotes</p>
      <p>Players can also delete a message, no sense in editing.</p>
      <p>Other players can favorite a message</p>
    </div>

    <div class="col-12">
      Here is where the messages will go
      <div class="bg-light text-dark rounded">
        <div v-for="message in messages" :key="message.id">
          Message: {{ message.body }} Room: {{ message.roomId }} Name: {{ message.creator.name }}
          <button class="btn btn-danger" @click="deleteMessage(message.id)">delete</button>
        </div>
      </div>
    </div>

    <div class="col-12">
      <p>For testing creating aid</p>
      <NewAssistance />
      <p>Aid is in the form of an extra item from their inventory, weapons, armor.</p>
      <p> Aid can be deleted</p>
      <p>Aid can only be claimed once</p>
      <p>Both parties benefit from aid</p>
      <p>The receiving player can add a tip ( ex: +10 Gold )</p>
    </div>


    <div class="col-12">
      Here is where the aid will go
      <div class="bg-light text-dark rounded">
        <div v-for="assistance in assistances" :key="assistance.id">
          Assistance: {{ assistance.body }} Room: {{ assistance.roomId }} Name: {{ assistance.creator.name }}<button
            class="btn btn-danger" @click="deleteAssistance(assistance.id)">delete</button>
        </div>
      </div>
    </div>

  </section>
</template>


<script>
import { assistancesService } from "../services/AssistancesService.js";
import { AppState } from "../AppState.js";
import NewMessage from "../components/NewMessage.vue";
import { messagesService } from "../services/MessagesService.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted, watchEffect } from "vue";
import { bossService } from "../services/BossService.js";
import { logger } from "../utils/Logger.js";
import { bossDamageService } from "../services/BossDamageService.js";

export default {
  setup() {
    onMounted(() => {
      setBgImg();
    });

    const setBgImg = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        let bgImg = '../public/assets/bg_1.png';
        mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
      }
    }

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

    async function getBosses() {
      try {
        await bossService.getBosses()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function getBossDamageByBossId() {
      try {
        if (AppState.activeBoss.id != null) {
          logger.log('[ActiveBossId]', AppState.activeBoss.id)
          await bossDamageService.getBossDamageByBossId(AppState.activeBoss.id)
        }
      } catch (error) {
        Pop.error(error.message, '[]')
      }
    }

    async function setBossActivity(bossId) {
      try {
        await bossService.setBossActivity(bossId)
      } catch (error) {
        Pop.error(error.message, '[]')
      }
    }

    onMounted(() => {
      getMessages()
      getAssistances()
      getBosses()
      getBossDamageByBossId()
    })


    return {
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
      messages: computed(() => AppState.messages),
      assistances: computed(() => AppState.assistances),
      activeBoss: computed(() => AppState.activeBoss),
      bosses: computed(() => AppState.bosses),
      setBossActivity

    }
  }
}
</script>


<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
}
</style>

<!-- Zarathos the Devourer
Nerathul the Doombringer
Thrakadon the Eternal Flame
Xandros the Night Terror
Gorgathor the Annihilator
Vorgoth the Voidcaller
Mordrath the Desolation
Balroth the Infernal
Draconis the Shadowbane
Azarok the Unyielding -->