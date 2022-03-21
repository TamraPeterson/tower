<template>
  <div class="text-center mt-3">
    <h1>Welcome</h1>
    <h3 class="">{{ account.name }}</h3>
    <img class="p-3" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <div class="row justify-content-center pt-4">
      <!-- <div class="col-md-10"><h5>Events you're hosting:</h5></div>
      <div class="col-md-10 bg-secondary p-2">
        <div class="row p-4">
          <div class="col-2">
            {{ account.name }}
          </div>
        </div>
      </div> -->
      <div class="col-md-10 pt-4"><h5>Events you're attending:</h5></div>
      <div class="col-md-10 bg-secondary p-4">
        <div class="row p-4 text-center">
          <div
            class="col-3 p-3 hover"
            v-for="t in myAccountTickets"
            :key="t.id"
          >
            <TowerEvent :towerEvent="t" />
            <button
              class="btn btn-info mb-3"
              @click="cancelMyTicket(t.eventId)"
            >
              Cancel my ticket
            </button>
          </div>
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
import { accountService } from "../services/AccountService"
import { router } from "../router"
export default {
  props: {
    towerEvent: {
      type: Object,
      required: true
    }
  },
  name: 'Account',
  setup(props) {
    onMounted(async () => {
      try {
        accountService.getMyEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      goTo() {
        router.push({ name: 'EventDetails', params: { id: props.towerEvent.id } })
      },
      async cancelMyTicket(id) {
        try {
          if (await Pop.confirm('Are you sure you want to give up your ticket?')) {
            accountService.cancelMyTicket(id)
          }

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      account: computed(() => AppState.account),
      myAccountTickets: computed(() => AppState.myAccountTickets),
      towerEvents: computed(() => AppState.towerEvents)

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
.hover {
  transition: 0.3s;
}
.hover:hover {
  transform: scale(1.1);
  transition: 0.3s;
}
</style>
