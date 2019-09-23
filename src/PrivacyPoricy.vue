<template>
  <div id="app">
    <gyakutter-title />
    <h1 class="has-text-centered is-size-4 title">プライバシーポリシー</h1>
    <section class="section">
      <div class="container">
        <h2 class="subtitle is-size-5" style="margin-bottom: 1rem">
          当サイトに掲載されている広告について
        </h2>
        <p class="is-size-6" style="margin-bottom:2rem">
          当サイトでは、第三者配信の広告サービス（
          <a
            href="https://www.google.com/adsense/start/#/?modal_active=none"
            target="_blank"
            >Googleアドセンス</a
          >、
          <a href="https://affiliate.amazon.co.jp/" target="_blank"
            >Amazonアソシエイト</a
          >、
          <a href="https://admax.shinobi.jp/" target="_blank">忍者AdMax</a
          >）を利用しています。
          このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、
          当サイトや他サイトへのアクセスに関する情報
          『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません) を
          使用することがあります。 またGoogleアドセンスに関して、
          このプロセスの詳細やこのような情報が広告配信事業者に
          使用されないようにする方法については、
          <a
            href="https://policies.google.com/technologies/ads?hl=ja"
            target="_blank"
            >こちら</a
          >をクリックしてください。
        </p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="subtitle is-size-5" style="margin-bottom: 1rem">
          当サイトが使用しているアクセス解析ツールについて
        </h2>
        <p class="is-size-6" style="margin-bottom:2rem">
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
          このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
          この規約に関して、詳しくは<a
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            target="_blank"
            >こちら</a
          >、または<a
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            target="_blank"
            >こちら</a
          >をクリックしてください。
        </p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="subtitle is-size-5" style="margin-bottom: 1rem">
          免責事項
        </h2>
        <p class="is-size-6">
          当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。
          当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
          当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
          当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </p>
      </div>
    </section>
    <gyakutter-footer />
  </div>
</template>

<script>
import GyakutterTitle from "./components/GyakutterTitle.vue";
import GyakutterFooter from "./components/GyakutterFooter.vue";
export default {
  components: {
    GyakutterTitle,
    GyakutterFooter
  }
};
</script>

<style lang="sass">
$footer-padding: 1.0rem
@import "../node_modules/bulma/bulma.sass";
.title
  padding: 2rem
  margin-bottom: 0rem;
.section
  padding: 0rem 1.5rem
</style>
