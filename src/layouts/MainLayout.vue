<template lang="pug">
transition(name="fade", mode="out-in")
  .wrapper
    main-sidebar
    .content
      router-view
</template>

<script lang="ts" setup>
import MainSidebar from "@/components/MainSidebar.vue";
import HeaderDetails from "@/components/HeaderDetails.vue";
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}
</style>
