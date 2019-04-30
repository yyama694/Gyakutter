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
            id="search-text"
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
        <div id="spinner" class="spinner">
          <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#00d1b2"
          />
        </div>
        <div id="error-msg" class="error">
          ツィートが取得できませんでした。
        </div>
        <div v-for="d in list" :key="d.id_str" class="box">
          <div
            v-if="d === 'ads'"
            name="ad-space"
            class="ads"
            :key="'ads_' + d.id_str"
          ></div>
          <div v-else>
            <div
              class="columns is-mobile"
              v-if="d.retweeted_status"
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

            <div v-if="!d.retweeted_status">
              <!-- 通常のツイート -->
              <normal-tweet :data="d" />
            </div>
            <div v-else>
              <!-- 引用リツイート -->
              <retweet :data="d" />
            </div>
          </div>
        </div>
        <a href="#" id="return-top">Top</a>
      </section>
    </div>
  </div>
</template>

<script>
import getTweetById from "../api/Tweet.js";
import { HalfCircleSpinner } from "epic-spinners";
import NormalTweet from "./NormalTweet.vue";
import Retweet from "./Retweet.vue";
export default {
  components: {
    HalfCircleSpinner,
    NormalTweet,
    Retweet
  },
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
      document.getElementById("error-msg").style.display = "none";
      document.getElementById("spinner").style.display = "block";
      const tags = document.getElementsByName("ad-space");
      tags.forEach(element => {
        // 意味なかったら消す
        while (element.firstChild) element.removeChild(element.firstChild);
      });
      this.user_id = this.$refs.input_user_id.value;
      const self = this;
      getTweetById(this.user_id)
        .then(function(result) {
          self.list = result;
          for (let i = 0; i < self.list.length; i++) {
            var random = Math.floor(Math.random() * 20);
            if (random === 0) self.list.splice(i, 0, "ads");
          }
          document.getElementById("spinner").style.display = "none";
        })
        .catch(() => {
          self.list = [];
          document.getElementById("error-msg").style.display = "block";
          document.getElementById("spinner").style.display = "none";
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
    },
    getDisplayWidh: function() {
      return document.body.clientWidth;
    },
    scrollToTop: function(elmId, duration) {
      //トップに戻るボタンの要素の取得
      var topButton = document.getElementById(elmId);

      topButton.addEventListener(
        "click",
        function(e) {
          //デフォルトの動作の制御
          e.preventDefault();

          var begin = new Date() - 0;
          var yOffset = window.pageYOffset;
          var timer = setInterval(function() {
            var current = new Date() - begin;
            if (current > duration) {
              clearInterval(timer);
              current = duration;
            }

            //スクロール位置を単位時間で変更する
            window.scrollTo(0, yOffset * (1 - current / duration));
          }, 10);
        },
        false
      );
    }
  },
  mounted() {
    document.getElementById("search-text").focus();
    this.scrollToTop("return-top", 300);
  },
  updated() {
    const windowWidh = this.getDisplayWidh();
    const html =
      windowWidh > 780
        ? '<script src="//adm.shinobi.jp/s/6ceb5a2c7c61f2b1f65ef5095d17e63e"><\/script>': //eslint-disable-line 
      '<script src="//adm.shinobi.jp/s/ed15fe210d870b401447c2ae7992e5a7"><\/script>'; //eslint-disable-line
    const tags = document.getElementsByName("ad-space");
    tags.forEach(element => {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("border", "0");
      iframe.setAttribute(
        "class",
        windowWidh > 780 ? "iframe-ads-pc" : "iframe-ads-mobile"
      );
      element.appendChild(iframe);
      const iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(html);
      iframeDocument.close();
    });
  }
};
</script>

<style lang="sass">
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
.spinner
  width: 60px
  height: 60px
  margin: auto
  display: none
  padding: 0
.iframe-ads-pc
  height: 100px;
  width: 100%;
.iframe-ads-mobile
  height: 260px;
  width: 100%;
#return-top
  opacity: 0.8 ;
  background-color: #00d1b2;
  border-radius: 50%;
  bottom: 10px;
  color: #fff;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  position: fixed;
  right: 10px;
  text-align: center;
  width: 50px;
  transition: 0.5s;
#return-top:hover
  opacity: 0.5 ;
.error
  color: $danger;
  font-weight: bold;
  display: none;
.fa-retweet
  color: $grey-light;
  padding: 0;
</style>
