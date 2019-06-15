<template>
  <div v-if="displayData">
    <div
      class="columns is-mobile"
      v-if="data.retweeted_status"
      style="padding: 0; margin: 0;"
    >
      <div
        class="column is-1-desktop is-1-tablet is-2-mobile"
        style="padding: 0;"
      >
        <font-awesome-icon icon="retweet" class="fa-pull-right" />
      </div>
      <div class="column"></div>
    </div>
    <div class="columns  is-mobile">
      <div class="column is-1-desktop is-1-tablet is-2-mobile">
        <figure class="image">
          <img
            clss="is-rounded"
            style="border-radius:50%"
            :src="displayData.user.profile_image_url_https"
          />
        </figure>
      </div>
      <div class="column">
        <span class="is-pulled-left has-text-black">
          {{ displayData.user.name
          }}<span class="has-text-grey is-size-7"
            ><a
              href="#"
              @click.stop="$emit('user', displayData.user.screen_name, $event)"
              onclick="return false;"
              >@{{ displayData.user.screen_name }}</a
            ></span
          >
        </span>
        <span class="is-pulled-right has-text-grey is-size-7">
          {{ fd(displayData.created_at) }}
        </span>
        <component @user="showUserMenu" :is="dynamicTweetText" />
        <div v-if="displayData.og" class="box" style="margin: 10px;">
          <a
            :href="displayData.og.og_url"
            class="columns url-img"
            target="_blank"
          >
            <img
              :src="displayData.og.og_image"
              class="column is-2"
              style="max-height:120px;"
            />
            <div class="column">
              <div>
                {{ displayData.og.og_title }}
              </div>
              <div>
                {{ displayData.og.og_description }}
              </div>
            </div>
          </a>
        </div>
        <div
          v-else-if="lPhotoCount > 0"
          class="columns is-mobile is-marginless"
          style="width: 100%;max-width: 1024px; line-height: 0;"
        >
          <div class="column is-marginless is-paddingless">
            <img
              :src="displayData.extended_entities.media[0].media_url_https"
            /><br />
            <img
              v-if="lPhotoCount >= 3"
              :src="displayData.extended_entities.media[2].media_url_https"
            />
          </div>
          <div
            class="column is-marginless is-paddingless"
            v-if="lPhotoCount >= 2"
          >
            <img
              v-if="lPhotoCount >= 2"
              :src="displayData.extended_entities.media[1].media_url_https"
            /><br />
            <img
              v-if="lPhotoCount >= 4"
              :src="displayData.extended_entities.media[3].media_url_https"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "./common.js";
import { photoCount } from "./common.js";

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    dynamicTweetText: function() {
      return {
        template: `<div class="tweet-text">${this.displayData.text}</div>`
      };
    }
  },
  data: function() {
    return {
      displayData: undefined,
      lPhotoCount: 0
    };
  },
  methods: {
    fd: function(dateStr) {
      return formatDate(dateStr);
    },
    showUserMenu: function(name, event) {
      this.$emit("user", name, event);
    }
  },
  mounted() {
    if (this.data.retweeted_status) {
      this.displayData = this.data.retweeted_status;
    } else {
      this.displayData = this.data;
    }
    this.lPhotoCount = photoCount(this.data);
  }
};
</script>

<style scoped>
a:link.url-img {
  color: #4a4a4a;
  text-decoration: none;
}
a:visited.url-img {
  color: #4a4a4a;
  text-decoration: none;
}
a:hover.url-img {
  color: #4a4a4a;
  text-decoration: none;
}
a:active.url-img {
  color: #4a4a4a;
  text-decoration: none;
}
</style>
