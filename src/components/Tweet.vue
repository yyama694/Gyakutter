<template>
  <div v-if="displayData">
    <div
      class="columns is-mobile"
      v-if="isRetweet"
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
        <div v-if="_photoCount(displayData) === 2">
          <component @user="showUserMenu" :is="dynamicTweetText" />
          <div
            class="columns is-mobile is-marginless"
            style="width: 100%;max-width: 1024px;"
          >
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
        </div>
        <div v-else-if="_photoCount(displayData) === 3">
          <component @user="showUserMenu" :is="dynamicTweetText" />
          <div
            class="columns is-mobile is-marginless"
            style="width: 100%;max-width: 1024px; line-height: 0;"
          >
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
        </div>
        <div v-else-if="_photoCount(displayData) === 4">
          <component @user="showUserMenu" :is="dynamicTweetText" />
          <div
            class="columns is-mobile is-marginless"
            style="width: 100%;max-width: 1024px; line-height: 0;"
          >
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
        </div>
        <div v-else-if="_photoCount(displayData)">
          <component @user="showUserMenu" :is="dynamicTweetText" />
          <img
            :src="displayData.extended_entities.media[0].media_url_https"
            style="width: 100%;max-width: 1024px;"
          />
        </div>
        <div v-else class="tweet-text">
          <component @user="showUserMenu" :is="dynamicTweetText" />
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
        template: `<div class="tweet-text"><p>${this.correctTweet()}</p></div>`
      };
    }
  },
  data: function() {
    return {
      displayData: undefined,
      isRetweet: false
    };
  },
  methods: {
    fd: function(dateStr) {
      return formatDate(dateStr);
    },
    _photoCount: function(data) {
      return photoCount(data);
    },
    showUserMenu: function(name, event) {
      this.$emit("user", name, event);
    },
    correctTweet() {
      if (
        this.displayData.extended_entities &&
        this.displayData.extended_entities.media[0]
      ) {
        return this.displayData.text.replace(
          this.displayData.extended_entities.media[0].url,
          ""
        );
      } else {
        return this.displayData.text;
      }
    }
  },
  mounted() {
    if (this.data.retweeted_status) {
      this.displayData = this.data.retweeted_status;
      this.isRetweet = true;
    } else {
      this.displayData = this.data;
      this.isRetweet = false;
    }
  }
};
</script>

<style></style>
