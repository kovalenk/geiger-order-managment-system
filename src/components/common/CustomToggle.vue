<template lang="pug">
.custom-toggle(:class="{ open: isOpen }")
  .toggle(@click="isOpen = !isOpen")
    slot(name="head")
  .toggle-content
    slot(name="body")
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from "vue";
const props = defineProps({
  isSelected: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.isSelected,
  () => {
    isOpen.value = props.isSelected;
  }
);
const isOpen = ref(false);

onMounted(() => {
  isOpen.value = props.isSelected;
});
</script>

<style lang="scss" scoped>
.custom-toggle {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.1);

  @media (max-width: 1400px) {
    width: min-content;
  }

  .toggle {
    position: relative;
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
    min-height: 63px;
    min-width: 1092px;
    padding: 20px 30px 20px 45px;

    background-color: transparent;
    border: none;

    &::before {
      content: "";
      position: absolute;
      top: 23px;
      left: 20px;

      width: 20px;
      height: 20px;
      background-color: black;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-image: url("@/assets/images/chevron-bottom.svg");
    }
  }

  ::v-deep(.toggle) {
    h4 {
      flex: 1 1 auto;
      font-size: 23px;
      font-weight: 500;
    }
  }

  .toggle-content {
    display: none;
    flex-direction: column;
    padding: 0 20px 20px;
  }

  &.open {
    .toggle {
      &::before {
        transform: rotate(180deg);
      }
    }

    .toggle-content {
      display: flex;
      min-width: 1092px;
    }
  }
}
</style>
