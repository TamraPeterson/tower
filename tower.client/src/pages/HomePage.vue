<template>
  <div class="container-fluid">
    <div class="row justify-content-center p-3">
      <div class="col-md-11 bg-secondary text-white">
        <h1 class="text-center pt-3">Upcoming Events</h1>
        <div class="row justify-content-center pt-3 text-center">
          <!-- <div
            class="col-4 selectable"
            @click="getNewer()"
            title="Previous"
            v-if="newerPage"
          >
            <i class="mdi mdi-chevron-left"></i>Newer
          </div>
          <div
            class="col-4 selectable"
            @click="getOlder()"
            title="Next"
            v-if="olderPage"
          >
            Older
            <i class="mdi mdi-chevron-right"></i>
          </div> -->
        </div>
        <div class="row justify-content-center">
          <div class="col-md-7 p-3" v-for="p in posts" :key="p.id">
            <Post :post="p" />
          </div>
        </div>
        <div class="row p-md-4 justify-content-center text-center text-shadow">
          <div
            class="col-md-3 p-2 my-3 hover"
            v-for="t in towerEvents"
            :key="t.id"
          >
            <TowerEvent :towerEvent="t" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { towerEventsService } from "../services/TowerEventsService"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await towerEventsService.getAllEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      towerEvents: computed(() => AppState.towerEvents),
      olderPage: computed(() => AppState.olderPage),
      newerPage: computed(() => AppState.newerPage),
      async getNewer() {
        if (AppState.newerPage === null) {
          return;
        } else {
          try {
            await towerEventsService.getNewer();
          } catch (error) {
            logger.error(error);
            Pop.toast(error.message, "error");
          }
        }
      },
      async getOlder() {
        try {
          await towerEventsService.getOlder();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Mali:Mali:wght@200;600&display=swap");
h1 {
  font-family: "Mali", cursive;
  font-weight: 200;
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.hover {
  transition: 0.3s;
}
.hover:hover {
  transform: scale(1.1);
  transition: 0.3s;
}
</style>
