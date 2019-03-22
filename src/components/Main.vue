<template>
  <div>
    <h1>Gyakutter</h1>
    <input type="text" />
    <input type="button" value="Search" @click="search" />
    <div v-for="d in list" :key="d.id_str" class="tweet">{{d.text}}</div>
  </div>
</template>

<script>
import getTweetById from '../api/Tweet.js'
import axios from 'axios'
const url="https://twitter-ore-j.herokuapp.com/tweet/"
export default {
  name: "Main",
  props: {
    msg: String
  },
  data: function (){
    return {
      list :[]
    }
  },
  methods: {
    search : function(){
      const self = this
      axios.get(url + 'yyama694/200?trim_user=true').then(function(response){
        console.log(response)
        self.list = response.data.reverse()
      })
    }
  }
};
</script>

<style scoped>
.tweet {
  margin :10px 10px 10px 10px
}
</style>
