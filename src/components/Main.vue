<template>
  <div
    style="background-color: #eff7f6;"
    @click="hiddenUserMenu"
    class="is-size-7-touch"
  >
    <div class="hero is-primary hero-body">
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
    <div class="container main-area">
      <div class="description">
        ユーザ名を指定して Search ボタンを押してください。
      </div>
      <div class="columns">
        <div class="column">
          <input
            id="search-text"
            tabindex="1"
            class="input"
            type="text"
            @keyup.enter="search"
            placeholder="例）@TwitterJP"
            ref="input_user_id"
            list="user-list"
          />
          <datalist id="user-list">
            <option v-for="u in usersCandidate" :key="u" :value="u" />
          </datalist>
        </div>
        <div class="column">
          <a
            ref="btn_search"
            class="button is-success"
            tabindex="2"
            @click="
              list = [];
              tweet_id_str = '';
              search();
            "
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
        <div id="load-old-tweet" class="box load-old-tweet">
          <a @click="search">さらに古いツイートを取得する</a>
        </div>
        <div
          v-for="d in list"
          :key="d.id_str"
          class="box"
          style="margin-bottom: 1.0rem"
        >
          <div
            v-if="d === 'ads'"
            name="ad-space"
            class="ads"
            :key="'ads_' + d.id_str"
          ></div>
          <div v-else>
            <div v-if="d.retweeted_status">
              <!-- リツイート -->
              <tweet :data="d" @user="showUserMenu" />
            </div>
            <div v-else-if="d.quoted_status">
              <!-- 引用リツイート -->
              <quote-retweet :data="d" @user="showUserMenu" />
            </div>
            <div v-else>
              <!-- 通常のツイート -->
              <tweet :data="d" @user="showUserMenu" />
            </div>
          </div>
        </div>
        <a href="#" id="return-top">Top</a>
      </section>
    </div>
    <div
      id="user-menu"
      class="card box"
      ref="userMenu"
      style="padding: 1rem; background-color: #f4f7f7"
    >
      <a href="#" @click="searchUser" onclick="return false;" class="is-size-6"
        >このユーザを検索</a
      >
    </div>
  </div>
</template>

<script>
import getTweetById from "../api/Tweet.js";
import { HalfCircleSpinner } from "epic-spinners";
import Tweet from "./Tweet.vue";
import QuoteRetweet from "./QuoteRetweet.vue";
import { replaceMention } from "./common.js";
import { replaceUrl } from "./common.js";
import { replaceExtraUrl } from "./common.js";

const displayNone = function(event) {
  event.srcElement.style.visibility = "hidden";
};
export default {
  components: {
    HalfCircleSpinner,
    Tweet,
    QuoteRetweet
  },
  name: "Main",
  props: {
    msg: String
  },
  data: function() {
    return {
      user_id: "",
      list: [],
      pre_user_id: "",
      usersCandidate: [],
      tweet_id_str: ""
    };
  },
  methods: {
    scroll: function() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const e = document.getElementById("return-top");
      if (scrollTop > 100) {
        e.removeEventListener("transitionend", displayNone);
        e.style.opacity = 0.8;
        e.style.visibility = "visible";
      } else {
        e.style.opacity = 0.0;
        e.addEventListener("transitionend", displayNone);
      }
    },
    search: function() {
      document.getElementById("error-msg").style.display = "none";
      document.getElementById("spinner").style.display = "block";
      document.getElementById("load-old-tweet").style.display = "none";
      this.user_id = this.$refs.input_user_id.value;
      this.$refs.btn_search.focus();
      const self = this;
      getTweetById(this.user_id, this.tweet_id_str)
        .then(function(result) {
          let tmpList;
          tmpList = replaceExtraUrl(result);
          tmpList = replaceMention(tmpList);
          tmpList = replaceUrl(tmpList, self);
          for (let i = 0; i < tmpList.length; i++) {
            const random = Math.floor(Math.random() * 20);
            if (random === 0) tmpList.splice(i, 0, "ads");
          }
          self.list = tmpList.concat(self.list);
          self.tweet_id_str = self.list[0].id_str;
          console.log("tweet_id_str:" + self.tweet_id_str);
          // Cookieに格納
          const arr2 = self
            .getUserListFromCookie()
            .filter(s => !(s === self.user_id));
          arr2.unshift(self.user_id);
          arr2.splice(25);
          const count = new Date("2037/12/31 23:59");
          document.cookie =
            "users=" +
            encodeURIComponent(arr2.join(",")) +
            "; expires=" +
            count.toUTCString() +
            ";";
          self.usersCandidate = arr2;

          document.getElementById("spinner").style.display = "none";
          document.getElementById("load-old-tweet").style.display = "block";
        })
        .catch(e => {
          console.log(e);
          self.list = [];
          document.getElementById("error-msg").style.display = "block";
          document.getElementById("spinner").style.display = "none";
        });
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
    },
    showUserMenu: function(name, event) {
      const posX = event.clientX;
      const posY = event.clientY;
      this.$refs.userMenu.style.left = posX + "px";
      this.$refs.userMenu.style.top = posY + "px";
      this.$refs.userMenu.classList.add("show");
      this.pre_user_id = name;
    },
    hiddenUserMenu: function() {
      this.$refs.userMenu.classList.remove("show");
    },
    searchUser: function() {
      this.list = [];
      this.tweet_id_str = "";
      this.$refs.input_user_id.value = this.pre_user_id;
      document.getElementById("spinner").style.display = "block";
      document.getElementById("return-top").click();
      setTimeout(this.search, 300);
    },
    getUserListFromCookie: function() {
      const cookie = decodeURIComponent(document.cookie);
      if (!cookie) return [];
      const users = cookie
        .split(";")
        .filter(s => s.trim().startsWith("users="));
      if (!users[0]) return [];
      return users[0]
        .trim()
        .substr(6)
        .split(",");
    },
    getParam: function(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&"); // eslint-disable-line
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  },
  mounted() {
    window.addEventListener("scroll", this.hiddenUserMenu);
    window.addEventListener("scroll", this.scroll);
    document.getElementById("search-text").focus();
    this.scrollToTop("return-top", 300);
    this.usersCandidate = this.getUserListFromCookie();
    const userParam = this.getParam("user_name");
    if (userParam) {
      this.$refs.input_user_id.value = userParam;
      this.search();
    }
  },
  updated() {
    const windowWidh = this.getDisplayWidh();
    const html =
      windowWidh > 780
        ? '<script src="//adm.shinobi.jp/s/6ceb5a2c7c61f2b1f65ef5095d17e63e"><\/script>': //eslint-disable-line 
      '<script src="//adm.shinobi.jp/s/ed15fe210d870b401447c2ae7992e5a7"><\/script>'; //eslint-disable-line
    const tags = document.getElementsByName("ad-space");
    tags.forEach(element => {
      if (element.children.length > 0) {
        return;
      }
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
  white-space: pre-wrap;
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
  margin: 10px auto
  display: none
  padding: 0px
.iframe-ads-pc
  height: 100px;
  width: 100%;
  margin: auto;
  display: block;
  width: 744px;
  height: 106px;
.iframe-ads-mobile
  height: 266px;
  width: 316px
  margin: auto;
  display: block;
#return-top
  opacity: 0.0 ;
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
  transition: 1.0s;
  visibility: hidden;
#return-top:hover
  opacity: 0.5 !important;
.error
  color: $danger;
  font-weight: bold;
  display: none;
.fa-retweet
  color: $grey-light;
  padding: 0;
.main-area
  padding: 1rem 1rem 1rem 1rem;
#user-menu
  width: 170px;
  position: fixed;
  display: none;
#user-menu.show
  display: block;
.load-old-tweet
  border-radius: 0px;
  text-align: center;
  display: none;
</style>
