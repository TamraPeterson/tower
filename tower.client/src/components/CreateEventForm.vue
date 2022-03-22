<template>
  <div class="bg-secondary">
    <form>
      <div class="form-group">
        <label for="title" class="form-label mt-2">Event Name:</label>
        <input
          v-model="editable.name"
          type="name"
          class="form-control"
          id="project-name"
        />
      </div>
      <div class="form-group">
        <label for="title" class="form-label mt-2">Date:</label>
        <input
          v-model="editable.startDate"
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
          v-model="editable.description"
          type="description"
          class="form-control"
          id="event-description"
        />
      </div>
      <div class="form-group">
        <label for="type" class="form-label mt-2">Event Type:</label><br />
        <select
          name="event-type"
          v-model="editable.type"
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
          v-model="editable.capacity"
          type="name"
          class="form-control"
          id="event-capacity"
        />
      </div>
      <div class="form-group">
        <label for="title" class="form-label mt-2">Location:</label>
        <input
          v-model="editable.location"
          type="name"
          class="form-control"
          id="event-location"
        />
      </div>
      <div class="form-group">
        <label for="title" class="form-label mt-2">Image:</label>
        <input
          v-model="editable.coverImg"
          type="url"
          class="form-control"
          id="event-image"
        />
      </div>

      <button
        v-if="!eventData.id"
        @click="createEvent"
        type="submit"
        class="btn btn-info mt-3"
      >
        Create
      </button>
      <button v-else @click="editEvent" type="submit" class="btn btn-info mt-3">
        Save Changes
      </button>
    </form>
  </div>
</template>


<script>
import { reactive, ref } from "@vue/reactivity";
import { towerEventsService } from "../services/TowerEventsService"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: {
    eventData: {
      type: Object,
      required: false,
      default: {}
    }
  },
  setup(props) {
    const router = useRouter()
    const editable = ref({})
    watchEffect(() => {
      editable.value = props.eventData
    })
    return {
      editable,
      async createEvent() {
        try {
          const newEvent = await towerEventsService.create(editable.value);
          editable.value = {};
          Modal.getOrCreateInstance(
            document.getElementById("event-modal")
          ).hide();
          router.push({ name: 'EventDetails', params: { id: newEvent.id } })
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async editEvent() {
        try {
          await towerEventsService.update(editable.value);
          editable.value = {}
          Modal.getOrCreateInstance(document.getElementById("form-modal")).hide();
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  },
}
</script>


<style lang="scss" scoped>
.custom-select {
  width: 465px;
  height: 38px;
}
@media only screen and (max-width: 600px) {
  #event-type {
    width: 325px;
  }
}
</style>