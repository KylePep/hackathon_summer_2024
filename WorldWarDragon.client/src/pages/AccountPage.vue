<template>

  <section class="row">
    <div class="col-12 fs-1 fw-bold text-center">
      ACCOUNT PAGE
    </div>
  </section>

  <section class="row">
    <div class="col-8 mx-auto custom-bg border border-light rounded">

      <h2 class="">
        Change account stuff
      </h2>
      <section v-if="editMode == true" class="row fs-3 text-center">
        <div class="col-12">EDIT MODE</div>
        <div @click="selectPicture(1)" class="player-icon col-6" :class="[editable.picture == 1 ? 'selected' : '']"><img
            src="/assets/player/player1.jpeg" alt="player1">
        </div>
        <div @click="selectPicture(2)" class="player-icon col-6" :class="[editable.picture == 2 ? 'selected' : '']"><img
            src="/assets/player/player2.jpeg" alt="player2">
        </div>
        <div @click="selectPicture(3)" class="player-icon col-6" :class="[editable.picture == 3 ? 'selected' : '']"><img
            src="/assets/player/player3.jpeg" alt="player3">
        </div>
        <div @click="selectPicture(4)" class="player-icon col-6" :class="[editable.picture == 4 ? 'selected' : '']"><img
            src="/assets/player/player4.jpeg" alt="player4">
        </div>
        <div class="col-12">
          <input v-model="editable.name" class="form-control" type="text" name="name" id="name" placeholder="Name..."
            minlength="3" maxlength="255" required>
        </div>

      </section>

      <div class="fs-3 text-center" v-else>
        Account details
        <div class="player-icon">
          <img :src="account.picture" alt="">
        </div>
        <div>
          {{ account.name }}
        </div>
      </div>
      <div class="text-center">
        <button v-if="editMode == false" class="btn btn-primary" @click="handleEditing()">edit</button>
        <button class="btn btn-success" @click="handleEditing()" v-else>Submit</button>
      </div>

      <div class="fs-5 text-center">
        <div class="fs-4">
          Stats
        </div>
        <div>
          Valor: {{ account.valor || 0 }}
        </div>
        <div>
          Gold: {{ account.gold || 0 }}
        </div>
        <div>
          Health: {{ account.health || 0 }}
        </div>
        <div>
          Power: {{ account.power || 0 }}
        </div>
      </div>

      <div>

      </div>
    </div>
  </section>
</template>


<script>
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { computed, onMounted, ref, watchEffect } from "vue";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const editable = ref({})

    const editMode = ref(false)

    onMounted(() => {
      setBgImg();
    });

    watchEffect(() => {
      AppState.account
      editable.value = { ...AppState.account }
    })

    const setBgImg = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        let bgImg = '../public/assets/scales.jpeg';
        mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
      }
    }
    return {
      editable,
      editMode,
      account: computed(() => AppState.account),
      handleEditing() {
        if (editMode.value == false) {
          editMode.value = true
        } else {
          this.submitAccountChange()
          editMode.value = false
        }
      },
      selectPicture(pictureId) {
        editable.value.picture = pictureId;
      },
      async submitAccountChange() {
        try {
          const accountData = editable.value
          await accountService.editAccount(accountData)
        } catch (error) {
          Pop.error(error.message, '[ACCOUNT CHANGE]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.custom-bg {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.25' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right top, #343a40, #2b2c31, #211f22, #151314, #000000);
}

.selected {
  >img {
    border: 1px solid white;
  }
}

.player-icon {
  >img {
    width: 256px;
    height: auto
  }
}
</style>
