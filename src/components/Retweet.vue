<template>
  <div>
    <div class="column is-1-desktop is-1-tablet is-2-mobile">
      <figure class="image">
        <img
          clss="is-rounded"
          style="border-radius:50%"
          :src="data.retweeted_status.user.profile_image_url_https"
        />
      </figure>
    </div>
    <div class="column">
      <span class="is-pulled-left has-text-black">
        {{ data.retweeted_status.user.name
        }}<span class="has-text-grey is-size-7"
          >@{{ data.retweeted_status.user.screen_name }}</span
        >
      </span>
      <span class="is-pulled-right has-text-grey is-size-7">
        {{ fd(data.retweeted_status.created_at) }}
      </span>
      <div class="tweet-text">{{ data.retweeted_status.text }}</div>
    </div>
  </div>
</template>

<script>
import {formatDate as formatDate} from "./common.js"
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
    methods:{
    fd: function(dateStr) {
      return formatDate(dateStr);
    },
  }
}
</script>

<style></style>
