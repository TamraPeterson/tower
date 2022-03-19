<template>
  <div @click="goTo">
    <h6>{{ towerEvent.name }}</h6>
    <img
      :src="towerEvent.coverImg"
      alt=""
      class="img img-fluid selectable"
      title="event details"
    /><br />
  </div>
  <h6 class="pt-2">
    {{ new Date(towerEvent.startDate).toLocaleDateString() }}
  </h6>
  <p>{{ towerEvent.capacity }} tickets left</p>
</template>


<script>
import { router } from "../router"
export default {
  props: {
    towerEvent: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      goTo() {
        router.push({ name: 'EventDetails', params: { id: props.towerEvent.id } })
      },
    }
  }
}
</script>
 :to="

<style lang="scss" scoped>
.img {
  height: 250px;
  width: 250px;
  object-fit: cover;
}
</style>