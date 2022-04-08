<script lang="ts" setup>
import GlobalHeader from './atoms/header.vue'
import GlobalSider from './atoms/sider.vue'
import GlobalContent from './atoms/main.vue'
</script>

<template>
  <a-layout>
    <GlobalHeader />
    <a-layout>
      <GlobalSider />
      <GlobalContent />
    </a-layout>
  </a-layout>
</template>