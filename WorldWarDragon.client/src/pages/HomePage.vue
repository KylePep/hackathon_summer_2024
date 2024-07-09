<template>
  <section class="row">
    <div class="col-12 fs-1">
      Home Page
    </div>
  </section>
  <section class="row g-3">
    <div class="col-12">
      <p class="fw-bold">
        This game will rely on players abilities to help each other out in an indirect kind of way.
      </p>
      <p class="fw-semibold">This will be represented in 'aid' and 'messages'</p>
      <i>Should they be the same thing? </i>
      <i>Maybe the messages are required to come with a bonus of some kind. Like extra currency. But the aid will grow
        to be something more direct like a power up or a left behind weapon.</i>
    </div>
    <div class="col-12">
      <p>For testing creating messages</p>

      <p>Messages will be made with a preselected vocab or emotes</p>
      <p>Players can also delete a message, no sense in editing.</p>
      <p>Other players can favorite a message</p>
    </div>

    <div class="col-12">
      Here is where the messages will go
      <div class="bg-light text-dark rounded">Good Job! +10 Gold!</div>
    </div>

    <div class="col-12">
      <p>For testing creating aid</p>
      <button class="btn btn-primary">Create Aid</button>
      <p>Aid is in the form of an extra item from their inventory, weapons, armor.</p>
      <p> Aid can be deleted</p>
      <p>Aid can only be claimed once</p>
      <p>Both parties benefit from aid</p>
      <p>The receiving player can add a tip ( ex: +10 Gold )</p>
    </div>


    <div class="col-12">
      Here is where the aid will go
      <div class="bg-light text-dark rounded">*Left behind old sword* - aider: +10HP</div>
    </div>

  </section>
</template>


<script>
import { messagesService } from "@/services/MessagesService.js";
import Pop from "@/utils/Pop.js";
import { onMounted } from "vue";

export default {
  setup() {

    async function getMessages() {
      try {
        await messagesService.getMessages()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getMessages()
    })

    return {}
  }
}
</script>


<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
}
</style>