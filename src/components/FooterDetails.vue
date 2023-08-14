<template lang="pug">
.footer-details(:class="{ open: !isSidebarOpen }")
  .left
    p.items-selected.inter-semi-bold {{ selectedProducts.length }} options selected
    .form-group
      label.inter-medium Bulk Action
      custom-drop-down
        template(v-slot:selectedItem)
          span.common-dropdown-selected(:class="{ disabled }") {{ bulkAction ? options[bulkAction - 1] : "Select Bulk Action" }}
        template(v-slot:content="props")
          span.common-dropdown-element(
            v-for="(item, key) in options",
            :key="key",
            @click="selectOption(key, props)"
          ) {{ item }}
  .drop-down--save
    button.save.inter-light(:class="{ disabled }", @click="submit") Apply
      i.icon.icon-check-icon
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import CustomDropDown, {
  DropDownPropsInterface,
} from "@/components/common/CustomDropDown.vue";

import { list, resetFilters, selectedProducts } from "@/composables/products";
import { isSidebarOpen } from "@/composables/sidebarActions";

const bulkAction = ref(0);
const options = [
  "Add $0.05 cost",
  "Add $0.10 cost",
  "Remove $0.15 cost",
  "Remove $0.05 cost",
  "Set a quantity of 2",
  "Set a quantity of 3",
  "Set a quantity of 4",
];

const disabled = computed(() => {
  return !bulkAction.value;
});

const selectOption = (key: number, props: DropDownPropsInterface) => {
  bulkAction.value = key + 1;
  props.toggleVisibility();
};

const submit = () => {
  switch (bulkAction.value) {
    case 1:
    case 2:
    case 3:
    case 4: {
      list.value.forEach((f) => {
        if (selectedProducts.value.includes(f.id)) {
          let iterator = 0;
          switch (bulkAction.value) {
            case 1: {
              iterator = 0.05;
              break;
            }
            case 2: {
              iterator = 0.1;
              break;
            }
            case 3: {
              iterator = -0.15;
              break;
            }
            case 4: {
              iterator = -0.05;
              break;
            }
          }
          f.sell = +Math.abs(+f.sell + iterator).toFixed(2);
        }
      });
      break;
    }
    case 5:
    case 6:
    case 7: {
      list.value.forEach((f) => {
        if (selectedProducts.value.includes(f.id)) {
          f.qty = +Math.abs(+f.qty + (bulkAction.value - 3)).toFixed(2);
        }
      });
      break;
    }
  }

  bulkAction.value = 0;
  resetFilters();
};
</script>

<style scoped lang="scss">
.footer-details {
  position: absolute;
  bottom: 0;
  left: 248px;
  display: flex;
  justify-content: space-between;

  padding: 15px 32px;

  width: calc(100% - 248px);
  height: 60px;
  min-height: 60px;

  border-top: 2px solid #dcdbdb;
  background-color: white;

  transition: all 0.2s ease;

  .left {
    display: flex;
    align-items: center;
    gap: 40px;
    p.items-selected {
      font-size: 15px;
      color: #1bc4f8;
    }
    .form-group {
      display: flex;
      align-items: center;
      gap: 15px;

      label {
        font-size: 11px;
        color: #c3c3c3;
        text-transform: uppercase;
        white-space: nowrap;
      }

      ::v-deep(.drop-down) {
        max-height: 32px;
        border-radius: 4px;

        .selected-item {
          padding: 6px 32px 6px 16px;

          font-size: 14px;
          line-height: 18px;
        }

        .drop-down {
          &--list {
            max-height: 185px;
          }

          &--content {
            top: -188px;
          }
        }
      }

      .common-dropdown-selected {
        color: black;

        &.disabled {
          color: var(--light-grey);
        }
      }

      .common-dropdown-element {
        cursor: pointer;
        display: flex;
        width: 100%;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid var(--very-light-grey);

        &:last-child {
          border: none;
        }

        &:hover {
          background: var(--default-background);
        }
      }
    }
  }

  .drop-down--save {
    display: flex;
    margin-bottom: 5px;

    .save {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      border-radius: 8px;
      background: var(--blue);
      color: white;
      padding: 10px;
      min-width: 120px;
      min-height: 32px;
      margin: 0;
      font-size: 14px;

      transition: scale 0.3s ease;

      .icon {
        width: 14px;
        height: 14px;
        &:before {
          background: white;
        }
      }

      &.disabled {
        pointer-events: none;
        opacity: 0.6;
      }

      &:hover {
        scale: 1.1;
      }
      &:active {
        scale: 1;
      }
    }
  }

  &.open {
    left: 60px;
    width: calc(100% - 60px);
  }
}
</style>
