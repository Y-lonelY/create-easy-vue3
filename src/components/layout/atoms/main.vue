<script lang="ts" setup>
</script>

<template>
<a-layout-content>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive" />
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive" />
</a-layout-content>
</template>