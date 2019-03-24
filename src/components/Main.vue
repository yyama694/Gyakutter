<template>
  <div class="container">
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Gyakutter
          </h1>
          <h2 class="subtitle">
            ログイン不要！ 時系列昇順で Tweet を表示するアプリです。
          </h2>
        </div>
      </div>
    </div>
    <div class="notification">
      <div class="description">
        ユーザ名を指定して Search ボタンを押してください。
      </div>
      <div class="columns">
        <div class="column">
          <input
            tabindex="1"
            v-model="user_id"
            class="input"
            type="text"
            placeholder="例）yyama694"
          />
        </div>
        <div class="column">
          <a
            class="button is-success"
            tabindex="2"
            @click="search"
            v-on:keyup.enter="search"
            >Search</a
          >
        </div>
      </div>
      <section class="section">
        <div v-for="d in list" :key="d.id_str" class="box">
          <div>
            <span class="is-pulled-left">
              {{ d.user.name }}@{{ d.user.screen_name }}
            </span>
            <span class="is-pulled-right">
              {{ formatDate(d.created_at) }}
            </span>
          </div>
          <div class="tweet-text">{{ d.text }}</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import getTweetById from "../api/Tweet.js";

export default {
  name: "Main",
  props: {
    msg: String
  },
  data: function() {
    return {
      user_id: "",
      list: []
    };
  },
  methods: {
    search: function() {
      const self = this;
      getTweetById(this.user_id).then(function(result) {
        self.list = result;
      });
    },
    formatDate: function(dateStr) {
      const date = new Date(Date.parse(dateStr));
      let format = "yyyy年MM月dd日 HH:mm:ss";
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
      format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
      format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
      format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
      format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
      return format;
    }
  }
};
</script>

<style scoped lang="sass">
$box-padding: 0.6rem
@import "../../node_modules/bulma/bulma.sass";
.tweet-text
  clear: both;

.container
  font-family : "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans-serif;
.description
  margin: 0rem 0rem 0.5rem 0rem
.section
  padding: 0rem 0rem;
</style>
