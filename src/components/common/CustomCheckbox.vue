<template lang="pug">
.custom-checkbox
  input(
    type="checkbox",
    :checked="isChecked",
    @change="$emit('update:check', !isChecked)"
  )
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  isChecked: Boolean,
});
const emit = defineEmits(["update:check"]);
</script>

<style lang="scss" scoped>
.custom-checkbox {
  display: flex;
  width: min-content;
  height: min-content;
}
input[type="checkbox"] {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 0;
  margin: 0 0 0 0;
  outline: 0;
  padding: 0 !important;
  vertical-align: text-top;
  height: 20px;
  width: 20px;
  -webkit-appearance: none;
  border-radius: 6px;
  border: 1.5px solid var(--light-grey);
  background: transparent;
}

input[type="checkbox"]:checked {
  opacity: 1;
  background: #e5f0ff;
  border-color: var(--blue);
  &:before {
    display: block;
    content: "";
    margin: auto;
    mask: url("@/assets/images/check-icon.svg");
    mask-size: contain;
    mask-repeat: no-repeat;
    background: var(--blue);
    width: 20px;
    height: 20px;
  }
}
</style>
