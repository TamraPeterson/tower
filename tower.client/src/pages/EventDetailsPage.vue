<template>
  <div class="container-fluid">
    <div
      v-if="account.id == towerEvent.creatorId"
      class="row justify-content-end"
    >
      <div class="col-md-2">
        <button class="btn btn-info">Cancel Event</button>
      </div>
    </div>

    <div
      class="
        row
        justify-content-center
        mx-md-5
        mt-3
        bg-secondary
        align-items-center
        p-3
      "
    >
      <div class="col-md-5">
        <img
          class="img-fluid img rounded my-2"
          :src="towerEvent.coverImg"
          alt=""
        />
      </div>
      <div class="col-md-5">
        <h2 class="p-3">{{ towerEvent.name }}</h2>
        <h6 class="description">{{ towerEvent.description }}</h6>
        <h6 class="p-3 text-center">
          Date: {{ new Date(towerEvent.startDate).toLocaleString() }} ⭐
          {{ towerEvent.location }}
        </h6>
        <h4 class="text-center pt-2">Spots Left: {{ towerEvent.capacity }}</h4>
        <div class="text-center">
          <button
            v-if="!this.hasTicket"
            class="btn btn-info m-3"
            @click="createTicket"
          >
            Reserve Ticket
          </button>
        </div>
      </div>
    </div>
    <h6 class="pt-3 ms-4">People Attending This Event:</h6>
    <div class="row justify-content-center">
      <div class="col-11 d-flex flex-row bg-secondary rounded p-3">
        <div class="p-1" v-for="t in tickets" :key="t.id" :value="t.id">
          <img class="avatar" :src="t.picture" alt="" :title="t.name" />
        </div>
      </div>
    </div>
    <h6 class="p-2 pt-3 ms-4">What People are Saying About this Event:</h6>
    <div class="row justify-content-center">
      <div class="col-11 bg-secondary rounded p-3">
        <CommentBox />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { towerEventsService } from "../services/TowerEventsService";
import { ticketsService } from "../services/ticketsService";
import Pop from "../utils/Pop";
import { api } from "../services/AxiosService";
import { commentsService } from "../services/CommentsService";
export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        AppState.activeEvent = {};
        await towerEventsService.getById(route.params.id)
        await ticketsService.getEventTickets(route.params.id)
        await commentsService.getComments(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      towerEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      tickets: computed(() => AppState.tickets),
      hasTicket: computed(() =>
        AppState.tickets.find((t) => t.id == AppState.account.id)
      ),
      createTicket() {
        this.towerEvent.capacity--
        let newTicket = {
          accountId: AppState.account.id,
          eventId: AppState.activeEvent.id
        };
        if (this.hasTicket) {
          Pop.toast('You are already attending this event')
        }
        ticketsService.createTicket(newTicket)
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.img {
  height: 400px;
  width: 400px;
  object-fit: cover;
}
.description {
  line-height: 1.8;
}
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  transition: 0.2s;
}
.avatar:hover {
  transform: scale(1.3);
  transition: 0.2s;
}
</style>