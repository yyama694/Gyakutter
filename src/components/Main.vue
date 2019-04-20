<template>
  <div class="container">
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Gyakutter
          </h1>
          <h2 class="subtitle">
            ログイン不要！ 時系列昇順で ツィート を表示する Twitter
            クライアントです。
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
            :value="user_id"
            class="input"
            type="text"
            @keyup.enter="search"
            placeholder="例）@TwitterJP"
            ref="input_user_id"
          />
        </div>
        <div class="column">
          <a
            ref="btn_search"
            class="button is-success"
            tabindex="2"
            @click="search"
            @keyup.enter="search"
            >Search</a
          >
        </div>
      </div>
      <section class="section">
        <div v-for="d in list" :key="d.id_str" class="box">
          <div
            v-if="d === 'ads'"
            name="ad-space"
            class="ads"
            :key="'ads_' + d.id_str"
          ></div>
          <div v-else class="columns  is-mobile">
            <div class="column is-1">
              <figure class="image">
                <img
                  clss="is-rounded"
                  style="border-radius:50%"
                  :src="d.user.profile_image_url_https"
                />
              </figure>
            </div>
            <div class="column">
              <span class="is-pulled-left has-text-black">
                {{ d.user.name
                }}<span class="has-text-grey is-size-7"
                  >@{{ d.user.screen_name }}</span
                >
              </span>
              <span class="is-pulled-right has-text-grey is-size-7">
                {{ formatDate(d.created_at) }}
              </span>
              <div class="tweet-text">{{ d.text }}</div>
            </div>
          </div>
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
      const tags = document.getElementsByName("ad-space");
      tags.forEach(element => {
        // 意味なかったら消す
        while (element.firstChild) element.removeChild(element.firstChild);
      });
      this.user_id = this.$refs.input_user_id.value;
      const self = this;
      getTweetById(this.user_id).then(function(result) {
        self.list = result;
        for (let i = 0; i < self.list.length; i++) {
          var random = Math.floor(Math.random() * 15);
          if (random === 0) self.list.splice(i, 0, "ads");
        }
      });
      self.$refs.btn_search.focus();
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
  },
  updated() {
    const html =
      '<script src="//adm.shinobi.jp/o/bb6c418f05a4949f7067f15353e17ee1"><\/script>'; //eslint-disable-line
    const tags = document.getElementsByName("ad-space");
    console.log(tags);
    tags.forEach(element => {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("border", "0");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "100px");

      element.appendChild(iframe);
      const iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(html);
      iframeDocument.close();
    });
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
.gray-text
  color: $grey-light
.black-text
  color: $black
.ads
  width: 100%
  height: 100%
  margin: auto
</style>
