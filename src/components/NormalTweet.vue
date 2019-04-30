<template>
  <div>
    <!-- 通常のツイート -->
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
          >@{{ data.user.screen_name }}</span
        >
      </span>
      <span class="is-pulled-right has-text-grey is-size-7">
        {{ formatDate(data.created_at) }}
      </span>
      <div class="tweet-text">{{ data.text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
