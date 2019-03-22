<template>
  <div>
    <h1>Gyakutter</h1>
    <input type="text" />
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
      list: []
    };
  },
  methods: {
    search: function() {
      const self = this;
      getTweetById("yyama694").then(function(result) {
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
