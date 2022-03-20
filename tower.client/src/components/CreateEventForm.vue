<template>
  <div class="bg-secondary">
    <form @submit.prevent="createEvent">
      <div class="form-group">
        <label for="title" class="form-label mt-2">Event Name:</label>
        <input
          v-model="state.editable.name"
          type="name"
          class="form-control"
          id="project-name"
        />
      </div>
      <div class="form-group">
        <label for="title" class="form-label mt-2">Date:</label>
        <input
          v-model="state.editable.startDate"
          type="name"
          class="form-control"
          id="event-name"
        />
      </div>
      <div class="form-group">
        <label for="description 1" class="form-label mt-2"
          >Event Description:</label
        >
        <input
          v-model="state.editable.description"
          type="description"
          class="form-control"
          id="event-description"
        />
      </div>
      <div class="form-group">
        <label for="type" class="form-label mt-2">Event Type:</label>
        <select
          v-model="state.editable.type"
          class="custom-select rounded"
          id="event-type"
        >
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="digital">Digital</option>
          <option value="sport">Sport</option>
        </select>
      </div>
      <div class="form-group">
        <label for="title" class="form-label mt-2">Capacity:</label>
        <input
          v-model="state.editable.capacity"
          type="name"
          class="form-control"
          id="event-capacity"
        />
      </div>
      <div class="form-group">
        <label for="title" class="form-label mt-2">Location:</label>
        <input
          v-model="state.editable.location"
          type="name"
          class="form-control"
          id="event-location"
        />
      </div>
      <div class="form-group">
        <label for="title" class="form-label mt-2">Image:</label>
        <input
          v-model="state.editable.coverImg"
          type="url"
          class="form-control"
          id="event-image"
        />
      </div>

      <button type="submit" class="btn btn-info mt-3">Submit</button>
    </form>
  </div>
</template>


<script>
import { reactive } from "@vue/reactivity";
import { towerEventsService } from "../services/TowerEventsService"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      editable: {}
    })
    return {
      state,
      async createEvent() {
        try {
          const newEvent = await towerEventsService.create(state.editable);
          state.editable = {};
          Modal.getOrCreateInstance(
            document.getElementById("event-modal")
          ).hide();
          router.push({ name: 'EventDetails', params: { id: newEvent.id } })
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    }
  },
}
</script>


<style lang="scss" scoped>
.custom-select {
  width: 465px;
  height: 38px;
}
</style>