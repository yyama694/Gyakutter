<template>
  <div>
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
        <div v-if="_photoCount === 2" class="columns is-mobile is-marginless"
            style="width: 100%;max-width: 1024px;">
          <div class="column is-marginless is-paddingless">
            <img
              :src="displayData.extended_entities.media[0].media_url_https"
            />
          </div>
          <div class="column is-marginless is-paddingless">
            <img
              :src="displayData.extended_entities.media[1].media_url_https"
            />
          </div>
        </div>
        <div v-else-if="_photoCount === 3" class="columns is-mobile is-marginless"
            style="width: 100%;max-width: 1024px; line-height: 0;">
          <div class="column is-marginless is-paddingless">
            <img
              :src="displayData.extended_entities.media[0].media_url_https"
            /><br />
            <img
              :src="displayData.extended_entities.media[2].media_url_https"
            />
          </div>
          <div class="column is-marginless is-paddingless">
            <img :src="data.extended_entities.media[1].media_url_https" />
          </div>
        </div>
        <div v-else-if="_photoCount === 4" class="columns is-mobile is-marginless"
            style="width: 100%;max-width: 1024px; line-height: 0;">
          <div class="column is-marginless is-paddingless">
            <img
              :src="displayData.extended_entities.media[0].media_url_https"
            /><br />
            <img
              :src="displayData.extended_entities.media[2].media_url_https"
            />
          </div>
          <div class="column is-marginless is-paddingless">
            <img
              :src="displayData.extended_entities.media[1].media_url_https"
            /><br />
            <img
              :src="displayData.extended_entities.media[3].media_url_https"
            />
          </div>
        </div>
        <div v-else-if="_photoCount">
          <img
            :src="displayData.extended_entities.media[0].media_url_https"
            style="width: 100%;max-width: 1024px;"
          />
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
      _photoCount: 0
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
    this._photoCount = photoCount(this.data)
  }
};
</script>

<style></style>
