<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <b
      title="Add Event"
      class="
        m-md-3
        create-btn
        btn btn-info
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="modal"
      data-bs-target="#event-modal"
    >
      <i class="mdi mdi-plus" title="add-event"></i>
    </b>
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1 class="pt-3 ps-md-3">Tower Events</h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto"></ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
    <Modal id="event-modal">
      <template #modal-title>New Event</template>
      <template #modal-body><CreateEventForm /></template>
    </Modal>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mali:Mali:wght@200;600&display=swap");

h1 {
  font-family: "Mali", cursive;
  font-weight: 600;
}

li {
  font-family: "Mali", cursive;
  font-weight: 200;
}

a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.create-btn {
  height: 50px;
  width: 50px;
  transition: 0.2s;
}
.create-btn:hover {
  transform: scale(1.3);
  transition: 0.2s;
}
</style>
