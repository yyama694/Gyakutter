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
          <div>ユーザ名を指定して Search ボタンを押してください。</div>
          <div>
            @<input v-model="user_id" type="text" placeholder="例）yyama694" />
            <input type="button" value="Search" @click="search" />
          </div>
          <section class="section">
          <div v-for="d in list" :key="d.id_str" class="box">{{ d.text }}</div>
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
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../node_modules/bulma/bulma.sass";
</style>
