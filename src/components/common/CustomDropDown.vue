<template lang="pug">
.drop-down(
  :style="{ 'min-width': minWidth ? `${minWidth}px` : '' }",
  :class="{ disdefault: disableDefault }"
)
  .drop-down--section(ref="customSelect")
    button.selected-item(
      @click="toggleVisibility()",
      :class="openMenu === 'active' ? 'active' : ''",
      aria-label="open dropdown"
    )
      .selected-item--arrow
      slot(name="selectedItem", :toggleVisibility="toggleVisibility")
    .drop-down--content(
      :class="openMenu === 'active' && !blockMenu ? 'active' : ''"
    )
      transition(name="dropdown-fade")
        .drop-down--bg
          slot(name="static")
          ul.drop-down--list(v-if="isVisible", ref="dropdown")
            slot(name="content", :toggleVisibility="toggleVisibility")
</template>
<script setup lang="ts">
import { defineProps, nextTick, ref, defineEmits } from "vue";
import { useClickOutside } from "@/composables/clickOutside";

export type DropDownPropsInterface = { toggleVisibility(): void };

const props = defineProps({
  data: { type: Array },
  blockMenu: { type: Boolean, default: false },
  minWidth: { type: Number },
  disableDefault: { type: Boolean, default: false },
});

const emit = defineEmits(["dropdown", "closed", "opened"]);
const isVisible = ref(false);
const openMenu = ref();

const dropdown = ref();

const toggleVisibility = (isDefault = true) => {
  if (
    (isDefault && !props.disableDefault) ||
    (!isDefault && props.disableDefault)
  ) {
    isVisible.value = !isVisible.value;
    if (openMenu.value === "active") {
      openMenu.value = "";
      emit("closed");
    } else {
      openMenu.value = "active";
      emit("opened");
      nextTick(() => {
        emit("dropdown", dropdown.value);
      });
    }
  }
};
const customSelect = ref(null);
useClickOutside(customSelect, () => {
  if (openMenu.value === "active") {
    toggleVisibility(!props.disableDefault);
  }
});
</script>

<style lang="scss" scoped>
.drop-down {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: white;
  color: var(--black);
  border: 1px solid var(--very-light-grey);
  &.error {
    border: 1px solid red;
  }
  &--section {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .selected-item {
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 14px 32px 14px 16px;

    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;

    color: var(--grey-content);
    border: none;
    background: transparent;
    &--arrow {
      position: absolute;
      right: 8px;
      width: 14px;
      height: 14px;
      mask: url("@/assets/images/chevron-bottom.svg") no-repeat;
      mask-size: contain;
      mask-position: center;
      background: var(--light-grey);

      transition: all 0.3s;
    }
    &.active {
      .selected-item--arrow {
        transform: rotate(180deg);
      }
    }
  }
  &--list {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    width: 100%;
    max-height: 500px;
  }
  &--content {
    z-index: 1000;
    display: none;
    left: 0;
    position: absolute;
    top: 48px;
    width: 100%;
    background: white;
    box-shadow: 0px 4px 32px 0px #3d373414, 0px 4px 8px 0px #3d373414,
      0px 0px 2px 0px #3d373429;

    &.active {
      display: flex;
      flex-direction: column;
    }
  }
  &.disdefault {
    .selected-item {
      cursor: default;
    }
  }
}
</style>
