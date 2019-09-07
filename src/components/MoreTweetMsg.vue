<template>
  <div class="box load-old-tweet">
    <a @click="$emit('search')">{{ $t("message.get_older_tweet") }}</a>
  </div>
</template>
