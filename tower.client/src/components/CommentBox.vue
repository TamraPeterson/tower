<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h6>Tell Others What you Think...</h6>

      <form @submit.prevent="newComment">
        <div class="">
          <label for="" class="form-label"></label>
          <input
            v-model="state.editable.body"
            required
            type="text"
            class="form-control"
            aria-describedby="helpId"
          />
        </div>

        <div class="col-12 d-flex justify-content-end mt-1">
          <button class="btn btn-info">Comment</button>
        </div>
      </form>
    </div>
    <div class="row justify-content-center">
      <div
        class="
          col-md-9
          bg-dark
          p-3
          mt-4
          d-flex
          flex-row
          align-items-center
          rounded
        "
        v-for="c in comments"
        :key="c.id"
        :value="c.id"
      >
        <h5 v-if="c.creator.id == account.id" class="trash">
          <i
            class="mdi mdi-delete selectable"
            title="delete-comment"
            @click="removeComment(c.id, c.eventId)"
          ></i>
        </h5>
        <img
          class="avatar"
          :src="c.creator.picture"
          alt=""
          :title="account.name"
        />
        {{ c.creator.name }}
        <p class="ms-5">" {{ c.body }} "</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { commentsService } from "../services/CommentsService"
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { watchEffect } from "@vue/runtime-core";
export default {
  setup() {
    const route = useRoute();
    const state = reactive({
      editable: {},
    });
    watchEffect(async () => {
      try {
        await commentsService.getComments(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),

      state,
      newComment() {
        let comment = {
          creatorId: AppState.account.id,
          eventId: route.params.id,
          body: state.editable.body
        }
        commentsService.newComment(comment)
      },
      async removeComment(id, eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to remove this comment?'))
            await commentsService.removeComment(id, eventId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
.avatar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.trash {
  transform: translateY(-150%);
}
</style>