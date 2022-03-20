<template>
  <div class="about text-center mt-3">
    <h1>Welcome</h1>
    <h3 class="">{{ account.name }}</h3>
    <img class="p-3" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <div class="row justify-content-center pt-4">
      <div class="col-md-10"><h5>Events you're hosting:</h5></div>
      <div class="col-md-10 bg-secondary p-2">
        <div class="row p-4">
          <div class="col-3" >
          
        </div>
      </div>
      <div class="col-md-10 pt-4"><h5>Events you're attending:</h5></div>
      <div class="col-md-10 bg-secondary p-2">
        <div class="row p-4">
          <div class="col-3">Event</div>
          <div class="col-3">Event</div>
          <div class="col-3">Event</div>
          <div class="col-3">Event</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {

      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      myAccountTickets: computed(() => AppState.myAccountTickets)
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mali:Mali:wght@200;600&display=swap");

h1 {
  font-family: "Mali", cursive;
  font-weight: 600;
}

img {
  max-width: 150px;
  border-radius: 50%;
}
</style>
