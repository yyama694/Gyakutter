<template>
  <div class="columns  is-mobile">
    <div class="column is-1-desktop is-1-tablet is-2-mobile">
      <figure class="image">
        <img
          clss="is-rounded"
          style="border-radius:50%"
          :src="data.user.profile_image_url_https"
        />
      </figure>
    </div>
    <div class="column">
      <span class="is-pulled-left has-text-black">
        {{ data.user.name
        }}<span class="has-text-grey is-size-7"
          ><a
            href="#"
            @click.stop="$emit('user', data.user.screen_name, $event)"
            onclick="return false;"
            >@{{ data.user.screen_name }}</a
          ></span
        >
      </span>
      <span class="is-pulled-right has-text-grey is-size-7">
        {{ fd(data.created_at) }}
      </span>
      <div class="tweet-text">
        {{ data.text.replace(data.entities.urls[0].url, "") }}
      </div>
      <div class="box" style="margin: 10px">
        <tweet :data="data.quoted_status" @user="showUserMenu" />
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "./common.js";
import Tweet from "./Tweet.vue";
export default {
  components: {
    Tweet
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    fd: function(dateStr) {
      return formatDate(dateStr);
    },
    showUserMenu: function(name, event) {
      this.$emit("user", name, event);
    }
  }
};
</script>
