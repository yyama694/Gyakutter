(function(e){function t(t){for(var n,r,o=t[0],c=t[1],l=t[2],u=0,p=[];u<o.length;u++)r=o[u],i[r]&&p.push(i[r][0]),i[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);d&&d(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),s()}function s(){for(var e,t=0;t<a.length;t++){for(var s=a[t],n=!0,o=1;o<s.length;o++){var c=s[o];0!==i[c]&&(n=!1)}n&&(a.splice(t--,1),e=r(r.s=s[0]))}return e}var n={},i={app:0},a=[];function r(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=n,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var d=c;a.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"08b0":function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("cadf"),s("551c"),s("f751"),s("097d");var n=s("a026"),i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("Main")],1)},a=[],r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{"background-color":"#eff7f6"},on:{click:e.hiddenUserMenu}},[e._m(0),s("div",{staticClass:"container"},[s("div",{staticClass:"main-area"},[s("div",{staticClass:"description"},[e._v("\n        ユーザ名を指定して Search ボタンを押してください。\n      ")]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("input",{ref:"input_user_id",staticClass:"input",attrs:{id:"search-text",tabindex:"1",type:"text",placeholder:"例）@TwitterJP"},domProps:{value:e.user_id},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}}})]),s("div",{staticClass:"column"},[s("a",{ref:"btn_search",staticClass:"button is-success",attrs:{tabindex:"2"},on:{click:e.search,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}}},[e._v("Search")])])]),s("section",{staticClass:"section"},[s("div",{staticClass:"spinner",attrs:{id:"spinner"}},[s("half-circle-spinner",{attrs:{"animation-duration":1e3,size:60,color:"#00d1b2"}})],1),s("div",{staticClass:"error",attrs:{id:"error-msg"}},[e._v("\n          ツィートが取得できませんでした。\n        ")]),e._l(e.list,function(t){return s("div",{key:t.id_str,staticClass:"box",staticStyle:{"margin-bottom":"1.0rem"}},[s("div","ads"===t?{key:"ads_"+t.id_str,staticClass:"ads",attrs:{name:"ad-space"}}:[t.retweeted_status?s("div",[s("tweet",{attrs:{data:t},on:{user:e.showUserMenu}})],1):t.quoted_status?s("div",[s("quote-retweet",{attrs:{data:t},on:{user:e.showUserMenu}})],1):s("div",[s("tweet",{attrs:{data:t},on:{user:e.showUserMenu}})],1)])])}),s("a",{attrs:{href:"#",id:"return-top"}},[e._v("Top")])],2)])]),s("div",{ref:"userMenu",staticClass:"card box",staticStyle:{padding:"1rem","background-color":"#f4f7f7"},attrs:{id:"user-menu"}},[s("a",{staticClass:"is-size-6",attrs:{href:"#",onclick:"return false;"},on:{click:e.searchUser}},[e._v("このユーザを検索")])])])},o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"hero is-primary"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container"},[s("h1",{staticClass:"title"},[e._v("\n          Gyakutter\n        ")]),s("h2",{staticClass:"subtitle"},[e._v("\n          ログイン不要！ 時系列昇順で ツィート を表示する Twitter\n          クライアントです。\n        ")])])])])}],c=(s("386d"),s("ac6a"),s("96cf"),s("3b8d")),l=s("bc3a"),d=s.n(l),u="https://twitter-ore-j.herokuapp.com/tweet/";function p(e){return m.apply(this,arguments)}function m(){return m=Object(c["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get(u+t+"/50").then(function(e){return e.data.reverse()});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)})),m.apply(this,arguments)}var f=s("4583"),h=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.displayData?s("div",[e.isRetweet?s("div",{staticClass:"columns is-mobile",staticStyle:{padding:"0",margin:"0"}},[s("div",{staticClass:"column is-1-desktop is-1-tablet is-2-mobile",staticStyle:{padding:"0"}},[s("font-awesome-icon",{staticClass:"fa-pull-right",attrs:{icon:"retweet"}})],1),s("div",{staticClass:"column"})]):e._e(),s("div",{staticClass:"columns  is-mobile"},[s("div",{staticClass:"column is-1-desktop is-1-tablet is-2-mobile"},[s("figure",{staticClass:"image"},[s("img",{staticStyle:{"border-radius":"50%"},attrs:{clss:"is-rounded",src:e.displayData.user.profile_image_url_https}})])]),s("div",{staticClass:"column"},[s("span",{staticClass:"is-pulled-left has-text-black"},[e._v("\n        "+e._s(e.displayData.user.name)),s("span",{staticClass:"has-text-grey is-size-7"},[s("a",{attrs:{href:"#",onclick:"return false;"},on:{click:function(t){return t.stopPropagation(),e.$emit("user",e.displayData.user.screen_name,t)}}},[e._v("@"+e._s(e.displayData.user.screen_name))])])]),s("span",{staticClass:"is-pulled-right has-text-grey is-size-7"},[e._v("\n        "+e._s(e.fd(e.displayData.created_at))+"\n      ")]),2===e._photoCount(e.displayData)?s("div",[s(e.dynamicTweetText,{tag:"component",on:{user:e.showUserMenu}}),s("div",{staticClass:"columns is-mobile is-marginless",staticStyle:{width:"100%","max-width":"1024px"}},[s("div",{staticClass:"column is-marginless is-paddingless"},[s("img",{attrs:{src:e.displayData.extended_entities.media[0].media_url_https}})]),s("div",{staticClass:"column is-marginless is-paddingless"},[s("img",{attrs:{src:e.displayData.extended_entities.media[1].media_url_https}})])])],1):3===e._photoCount(e.displayData)?s("div",[s(e.dynamicTweetText,{tag:"component",on:{user:e.showUserMenu}}),s("div",{staticClass:"columns is-mobile is-marginless",staticStyle:{width:"100%","max-width":"1024px","line-height":"0"}},[s("div",{staticClass:"column is-marginless is-paddingless"},[s("img",{attrs:{src:e.displayData.extended_entities.media[0].media_url_https}}),s("br"),s("img",{attrs:{src:e.displayData.extended_entities.media[2].media_url_https}})]),s("div",{staticClass:"column is-marginless is-paddingless"},[s("img",{attrs:{src:e.data.extended_entities.media[1].media_url_https}})])])],1):4===e._photoCount(e.displayData)?s("div",[s(e.dynamicTweetText,{tag:"component",on:{user:e.showUserMenu}}),s("div",{staticClass:"columns is-mobile is-marginless",staticStyle:{width:"100%","max-width":"1024px","line-height":"0"}},[s("div",{staticClass:"column is-marginless is-paddingless"},[s("img",{attrs:{src:e.displayData.extended_entities.media[0].media_url_https}}),s("br"),s("img",{attrs:{src:e.displayData.extended_entities.media[2].media_url_https}})]),s("div",{staticClass:"column is-marginless is-paddingless"},[s("img",{attrs:{src:e.displayData.extended_entities.media[1].media_url_https}}),s("br"),s("img",{attrs:{src:e.displayData.extended_entities.media[3].media_url_https}})])])],1):e._photoCount(e.displayData)?s("div",[s(e.dynamicTweetText,{tag:"component",on:{user:e.showUserMenu}}),s("img",{staticStyle:{width:"100%","max-width":"1024px"},attrs:{src:e.displayData.extended_entities.media[0].media_url_https}})],1):s("div",{staticClass:"tweet-text"},[s(e.dynamicTweetText,{tag:"component",on:{user:e.showUserMenu}})],1)])])]):e._e()},y=[];s("a481");function _(e){var t=new Date(Date.parse(e)),s="yyyy年MM月dd日 HH:mm:ss";return s=s.replace(/yyyy/g,t.getFullYear()),s=s.replace(/MM/g,("0"+(t.getMonth()+1)).slice(-2)),s=s.replace(/dd/g,("0"+t.getDate()).slice(-2)),s=s.replace(/HH/g,("0"+t.getHours()).slice(-2)),s=s.replace(/mm/g,("0"+t.getMinutes()).slice(-2)),s=s.replace(/ss/g,("0"+t.getSeconds()).slice(-2)),s}function g(e){if(!e.extended_entities)return 0;if(!e.extended_entities.media)return 0;var t=e.extended_entities.media;return t.filter(function(e){return"photo"===e.type}).length}function v(e){return console.log("in replace Meition:"+e),e.forEach(function(e){var t=e.entities.user_mentions;console.log("mentions の数："+t.length),t.length&&(console.count(),t.forEach(function(t){console.log("mention:"+t.screen_name),e.text=e.text.replace("@"+t.screen_name,"<a href=\"#\" @click.stop=\"$emit('user','"+t.screen_name+'\', $event);" onclick="return false;">@'+t.screen_name+"</a>")})),console.count(),console.count();var s=e.quoted_status&&e.quoted_status.entities&&e.quoted_status.entities.user_mentions;console.log("quote mentions の数："+(s&&s.length)),s&&s.length&&s.forEach(function(t){console.log("mention:"+t.screen_name),e.quoted_status.text=e.quoted_status.text.replace("@"+t.screen_name,"<a href=\"#\" @click.stop=\"$emit('user','"+t.screen_name+'\', $event);" onclick="return false;">@'+t.screen_name+"</a>")})}),e}var w={props:{data:{type:Object,required:!0}},computed:{dynamicTweetText:function(){return{template:'<div class="tweet-text">'.concat(this.correctTweet(),"</div>")}}},data:function(){return{displayData:void 0,isRetweet:!1}},methods:{fd:function(e){return _(e)},_photoCount:function(e){return g(e)},showUserMenu:function(e,t){this.$emit("user",e,t)},correctTweet:function(){return this.displayData.extended_entities&&this.displayData.extended_entities.media[0]?this.displayData.text.replace(this.displayData.extended_entities.media[0].url,""):this.displayData.text}},mounted:function(){this.data.retweeted_status?(this.displayData=this.data.retweeted_status,this.isRetweet=!0):(this.displayData=this.data,this.isRetweet=!1)}},b=w,x=s("2877"),C=Object(x["a"])(b,h,y,!1,null,null,null),k=C.exports,M=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"columns  is-mobile"},[s("div",{staticClass:"column is-1-desktop is-1-tablet is-2-mobile"},[s("figure",{staticClass:"image"},[s("img",{staticStyle:{"border-radius":"50%"},attrs:{clss:"is-rounded",src:e.data.user.profile_image_url_https}})])]),s("div",{staticClass:"column"},[s("span",{staticClass:"is-pulled-left has-text-black"},[e._v("\n      "+e._s(e.data.user.name)),s("span",{staticClass:"has-text-grey is-size-7"},[s("a",{attrs:{href:"#",onclick:"return false;"},on:{click:function(t){return t.stopPropagation(),e.$emit("user",e.data.user.screen_name,t)}}},[e._v("@"+e._s(e.data.user.screen_name))])])]),s("span",{staticClass:"is-pulled-right has-text-grey is-size-7"},[e._v("\n      "+e._s(e.fd(e.data.created_at))+"\n    ")]),s(e.dynamicTweetText,{tag:"component",on:{user:e.showUserMenu}}),s("div",{staticClass:"box",staticStyle:{margin:"10px"}},[s("tweet",{attrs:{data:e.data.quoted_status},on:{user:e.showUserMenu}})],1)],1)])},T=[],D={components:{Tweet:k},props:{data:{type:Object,required:!0}},computed:{dynamicTweetText:function(){return{template:'<div class="tweet-text">'.concat(this.correctTweet(),"</div>")}}},methods:{fd:function(e){return _(e)},showUserMenu:function(e,t){this.$emit("user",e,t)},correctTweet:function(){return this.data.entities.urls[0]&&this.data.entities.urls[0].url?this.data.text.replace(this.data.entities.urls[0].url,""):this.data.text}}},E=D,S=Object(x["a"])(E,M,T,!1,null,null,null),$=S.exports,j=function(e){e.srcElement.style.visibility="hidden"},O={components:{HalfCircleSpinner:f["a"],Tweet:k,QuoteRetweet:$},name:"Main",props:{msg:String},data:function(){return{user_id:"",list:[],pre_user_id:""}},methods:{scroll:function(){var e=document.documentElement.scrollTop||document.body.scrollTop,t=document.getElementById("return-top");e>100?(t.removeEventListener("transitionend",j),t.style.opacity=.8,t.style.visibility="visible"):(t.style.opacity=0,t.addEventListener("transitionend",j))},search:function(){document.getElementById("error-msg").style.display="none",document.getElementById("spinner").style.display="block";var e=document.getElementsByName("ad-space");e.forEach(function(e){while(e.firstChild)e.removeChild(e.firstChild)}),this.user_id=this.$refs.input_user_id.value;var t=this;p(this.user_id).then(function(e){t.list=v(e);for(var s=0;s<t.list.length;s++){var n=Math.floor(20*Math.random());0===n&&t.list.splice(s,0,"ads")}document.getElementById("spinner").style.display="none"}).catch(function(){t.list=[],document.getElementById("error-msg").style.display="block",document.getElementById("spinner").style.display="none"})},getDisplayWidh:function(){return document.body.clientWidth},scrollToTop:function(e,t){var s=document.getElementById(e);s.addEventListener("click",function(e){e.preventDefault();var s=new Date-0,n=window.pageYOffset,i=setInterval(function(){var e=new Date-s;e>t&&(clearInterval(i),e=t),window.scrollTo(0,n*(1-e/t))},10)},!1)},showUserMenu:function(e,t){var s=t.clientX,n=t.clientY;this.$refs.userMenu.style.left=s+"px",this.$refs.userMenu.style.top=n+"px",this.$refs.userMenu.classList.add("show"),this.pre_user_id=e},hiddenUserMenu:function(){this.$refs.userMenu&&this.$refs.userMenu.classList.contains("show")&&this.$refs.userMenu.classList.remove("show")},searchUser:function(){this.$refs.input_user_id.value=this.pre_user_id,document.getElementById("spinner").style.display="block",document.getElementById("return-top").click(),setTimeout(this.search,300)}},mounted:function(){window.addEventListener("scroll",this.hiddenUserMenu),window.addEventListener("scroll",this.scroll),document.getElementById("search-text").focus(),this.scrollToTop("return-top",300)},updated:function(){var e=this.getDisplayWidh(),t=e>780?'<script src="//adm.shinobi.jp/s/6ceb5a2c7c61f2b1f65ef5095d17e63e"><\/script>':'<script src="//adm.shinobi.jp/s/ed15fe210d870b401447c2ae7992e5a7"><\/script>',s=document.getElementsByName("ad-space");s.forEach(function(s){var n=document.createElement("iframe");n.setAttribute("scrolling","no"),n.setAttribute("frameborder","0"),n.setAttribute("border","0"),n.setAttribute("class",e>780?"iframe-ads-pc":"iframe-ads-mobile"),s.appendChild(n);var i=n.contentWindow.document;i.open(),i.write(t),i.close()})}},U=O,B=(s("fa01"),Object(x["a"])(U,r,o,!1,null,null,null)),q=B.exports,I={name:"app",components:{Main:q}},P=I,L=Object(x["a"])(P,i,a,!1,null,null,null),A=L.exports,R=s("9483");Object(R["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var z=s("ecee"),H=s("c074"),N=s("ad3d");z["c"].add(H["a"]),n["a"].component("font-awesome-icon",N["a"]),n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(A)}}).$mount("#app")},fa01:function(e,t,s){"use strict";var n=s("08b0"),i=s.n(n);i.a}});
//# sourceMappingURL=app.de214c5f.js.map