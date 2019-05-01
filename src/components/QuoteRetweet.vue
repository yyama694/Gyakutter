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
      <div class="tweet-text">{{ data.text }}</div>
      <div class="box" style="margin: 10px">
        <div class="columns  is-mobile">
          <div class="column">
            <span class="is-pulled-left has-text-black">
              {{ data.quoted_status.user.name
              }}<span class="has-text-grey is-size-7"
                ><a
                  href="#"
                  @click.stop="
                    $emit('user', data.quoted_status.user.screen_name, $event)
                  "
                  onclick="return false;"
                  >@{{ data.quoted_status.user.screen_name }}</a
                ></span
              >
            </span>
            <span class="is-pulled-right has-text-grey is-size-7">
              {{ fd(data.quoted_status.created_at) }}
            </span>
            <div class="tweet-text">{{ data.quoted_status.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "./common.js";
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    fd: function(dateStr) {
      return formatDate(dateStr);
    }
  }
};
</script>
