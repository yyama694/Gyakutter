<template>
  <div>
    <h1>Gyakutter</h1>
    <div>ログイン不要！ 時系列昇順で Tweet を表示するアプリです。</div>
    <div></div>
    <div>ユーザ名を指定して Search ボタンを押してください。</div>
    @<input v-model="user_id" type="text" placeholder="例）yyama694" />
    <input type="button" value="Search" @click="search" />
    <div v-for="d in list" :key="d.id_str" class="tweet">{{ d.text }}</div>
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

<style scoped>
.tweet {
  margin: 10px 10px 10px 10px;
}
</style>
