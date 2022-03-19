<template>
  <div class="container-fluid">
    <div class="row justify-content-center p-3">
      <div class="col-md-11 bg-secondary text-white">
        <h1 class="text-center pt-3">Upcoming Events</h1>
        <div class="row p-4 justify-content-center text-center text-shadow">
          <div class="col-md-3 p-3 hover" v-for="t in towerEvents" :key="t.id">
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
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped lang="scss">
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
