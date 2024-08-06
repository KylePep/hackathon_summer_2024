<template>

  <section class="row">
    <div class="col-12 text-2p text-outline-bg fs-1 fw-bold text-center">
      ACCOUNT DETAILS
    </div>
  </section>

  <section class="row text-V text-outline-bg">
    <div class="col-11 col-md-8 mx-auto p-4 character-container ">
      <section v-if="editMode == true" class="row fs-3 text-center">
        <div class="col-12 text-2p">EDIT MODE</div>
        <div v-for="icon, index in characterIcons" :key="index" @click="selectPicture(index)" class="player-icon col-6"
          :class="[editable.picture == index ? 'selected' : '']">
          <img :src="icon" :alt="`player`">
        </div>
        <div class="col-12">
          <input v-model="editable.name" class="form-control" type="text" name="name" id="name" placeholder="Name..."
            minlength="3" maxlength="12" required>
        </div>

      </section>
      <section v-else class="row mb-4">
        <div class="fs-3 text-2p text-center">
          <h2 class="mb-5  text-uppercase">
            Character details
          </h2>
          <div class="player-icon">
            <img :src="account.picture" alt="">
          </div>
          <div class="text-uppercase fw-bold fs-3">
            {{ account.name }}
          </div>
          <div class="text-uppercase fw-bold fs-4">
            Level: {{ account.level }}
          </div>
        </div>
      </section>
      <section class="row">
        <div class="col-12 d-flex justify-content-center">
          <div v-if="editMode == false">
            <button class="btn btn-dark text-primary border-1 border-light" @click="handleEditing()">EDIT</button>
          </div>
          <div v-else>
            <button class="btn btn-dark text-danger border-1 border-light"
              @click="handleEditing('cancel')">CANCEL</button>
            <button class="btn btn-dark text-success border-1 border-light" @click="handleEditing()">SUBMIT</button>
          </div>
        </div>
      </section>
      <section v-if="availableValor >= levelUpRequirement - valorSpend" class="row text-outline mt-3">
        <div class="col-12 ">
          <div v-if="levelMode == false" class="row justify-content-center">
            <button @click="handleLeveling()" class="btn btn-dark text-success border-1 border-light">+ LEVEL UP | COST:
              {{ levelUpRequirement }}</button>
          </div>
          <div class="row justify-content-around" v-else>
            <div @click="increaseStat(0)" class="col-6 col-md-2 btn btn-dark text-primary border-1 border-light">+ {{
              levelUp[0]
            }}
              Health</div>
            <div @click="increaseStat(1)" class="col-6 col-md-2 btn btn-dark text-primary border-1 border-light">+ {{
              levelUp[1]
            }}
              Power</div>
            <div
              class="col-md-3 bg-dark px-3 pt-1 fw-semibold rounded border border-1 border-light text-info text-center">
              Cost: {{ levelUpRequirement }} | {{ valorSpend }}
            </div>
            <div @click="handleLeveling()" class="col-md-2 btn btn-dark text-success border-1 border-light ">SUBMIT
            </div>
            <div @click="handleLeveling('cancel'), increaseStat(-1)"
              class="col-md-2 btn btn-dark text-danger border-1 border-light ">CANCEL</div>
          </div>
        </div>
      </section>
      <section v-else class="row mt-3">
        <div class="col-12 d-flex justify-content-center">
          <div class="bg-dark p-2 border border-1 border-light rounded text-danger">
            LEVEL UP | COST: {{ levelUpRequirement }}
          </div>
        </div>
      </section>

      <section class="row mt-3">
        <div class="col-12 col-md-6 fs-5 text-center">
          <div class="fs-4 text-2p fw-bold">
            STATS
          </div>
          <div class="mdi mdi-circle-multiple">
            Gold: {{ account.gold || 0 }}
          </div>
          <div class="mdi mdi-medal">
            Valor: {{ account.valor || 0 }} | EXP: {{ availableValor - valorSpend }}
          </div>
          <div class="mdi mdi-heart">
            Health: {{ account.health || 0 }}
          </div>
          <div class="mdi mdi-weight-lifter">
            Power: {{ account.power || 0 }}
          </div>
        </div>
        <div class="col-12 col-md-6 fs-5 text-center">
          <div class="fs-4 text-2p fw-bold">
            INVENTORY
          </div>
          <div class="mdi mdi-sword-cross">
            Attack: {{ account.attack }}
          </div>
          <div class="mdi mdi-shield-sun">
            shield: {{ account.shield }}
          </div>
          <div class="mdi mdi-bottle-tonic-plus">
            heal: {{ account.heal }}
          </div>
        </div>
      </section>

      <div>

      </div>
    </div>
  </section>
</template>


<script>
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { CHARACTER_ICONS_DATA } from '../../../shared/constants/index.js'
import { computed, onMounted, ref, watchEffect } from "vue";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const editable = ref({})

    const editMode = ref(false)
    const levelMode = ref(false)

    const levelUp = ref({})
    const valorSpend = ref({})
    const levelNew = ref(0)

    onMounted(() => {
      setBgImg();
      levelUp.value = [0, 0]
      valorSpend.value = 0
    });

    watchEffect(() => {
      AppState.account
      editable.value = { ...AppState.account }
    })

    const setBgImg = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        let bgImg = '/assets/scales.jpeg';
        mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
      }
    }
    return {
      editable,
      editMode,
      levelMode,
      levelNew,
      account: computed(() => AppState.account),
      characterIcons: computed(() => CHARACTER_ICONS_DATA),
      availableValor: computed(() => AppState.account.valor - AppState.account.valorSpent),
      levelModifier: computed(() => (AppState.account.level + levelNew) * 2 + 1),
      levelBase: 100,
      levelUpRequirement: computed(() => Math.round(((AppState.account.level + levelNew.value) * 2 + 1) * 100)),
      levelUp,
      valorSpend,

      handleEditing(option) {
        if (option != 'cancel') {
          if (editMode.value == false) {
            editMode.value = true
          } else {
            this.submitAccountChange()
            editMode.value = false
          }
        } else {
          editMode.value = false
        }
      },
      increaseStat(option) {
        if (option == -1) {
          this.levelUp = [0, 0]
          this.valorSpend = 0
        } else {
          if (this.valorSpend + this.levelUpRequirement < this.availableValor) {
            option == 0 ? this.levelUp[option] += 10 : this.levelUp[option]++


            this.valorSpend += this.levelUpRequirement

            levelNew.value++
            logger.log(option, this.levelUp[0], this.levelUp[1], this.levelUpRequirement, levelNew.value)
          }

        }
      },
      handleLeveling(option) {
        if (option != 'cancel') {
          if (levelMode.value == false) {
            levelMode.value = true

          } else {
            editable.value.health = AppState.account.health += this.levelUp[0]
            editable.value.power = AppState.account.power += this.levelUp[1]
            editable.value.valorSpent = AppState.account.valorSpent += this.valorSpend
            editable.value.level = AppState.account.level + this.levelNew
            this.submitAccountChange()
            this.levelUp = [0, 0]
            this.valorSpend = 0
            this.levelNew = 0
            levelMode.value = false
          }
        } else {
          levelMode.value = false
          this.levelNew = 0
          // this.levelUp = [0, 0]
        }
      },
      selectPicture(pictureId) {
        editable.value.picture = pictureId;
      },
      async submitAccountChange() {
        try {
          const accountData = editable.value
          logger.log(accountData)
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

.character-container {
  background-color: var(--bs-body-bg);
  border: solid 4px var(--bs-outline);
  border-radius: 8px;
}

.selected {
  >img {
    border: 1px solid white;
  }
}

.player-icon {
  >img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 20vh;
  }
}
</style>
