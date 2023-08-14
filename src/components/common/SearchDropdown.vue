<template lang="pug">
.search-dropdown
  custom-drop-down(@dropdown="", @closed="", @opened="")
    template(v-slot:selectedItem="")
      i.icon.icon-filter
    template(v-slot:static="")
      .dropdown
        .dropdown--search
          .dropdown--icon
          input(v-model="search", placeholder="Search")
    template(v-slot:content="props")
      .dropdown--item.all(:class="{ active: eachSelected }")
        label.item
          custom-checkbox(:isChecked="eachSelected", @update:check="selectAll")
          .dropdown--name Select All
      .drop-down--scrollable
        li.dropdown--item(
          v-for="item in filteringData",
          :class="{ active: isSelected(item) }"
        )
          custom-checkbox(
            :isChecked="isSelected(item)",
            @update:check="selectItem(item, $event)"
          )
          .dropdown--name {{ item }}
      .drop-down--save
        button.save(@click="submit(props)") Apply
          i.icon.icon-check-icon
</template>

<script setup lang="ts">
import CustomDropDown, {
  DropDownPropsInterface,
} from "@/components/common/CustomDropDown.vue";
import CustomCheckbox from "@/components/common/CustomCheckbox.vue";
import { computed, ref, defineEmits, defineProps, watch } from "vue";

const props = defineProps({
  data: {
    type: Array as () => string[],
    default: () => [],
  },
  preselected: {
    type: Array as () => string[],
    default: () => [],
  },
});
const emit = defineEmits(["submit"]);

watch(
  () => props.preselected,
  () => {
    selectedItems.value = [...props.preselected];
  }
);

const search = ref("");
const selectedItems = ref<string[]>([]);

const filteringData = computed(() => {
  if (search.value) {
    return props.data?.filter((el) =>
      el.toUpperCase().includes(search.value.toUpperCase())
    );
  }
  return props.data;
});
const eachSelected = computed(() => {
  return props.data?.every((el) => selectedItems.value.includes(el));
});

const selectAll = () => {
  if (eachSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = props.data;
  }
};
const isSelected = (key: string) => {
  if (selectedItems.value.length) {
    return selectedItems.value.includes(key);
  }
  return false;
};
const selectItem = (item: string, state: boolean) => {
  if (state) {
    selectedItems.value.push(item);
  } else {
    const index = selectedItems.value.indexOf(item);
    if (index !== -1) {
      selectedItems.value.splice(index, 1);
    }
  }
};
const submit = (props: DropDownPropsInterface) => {
  props.toggleVisibility();
  emit("submit", selectedItems.value);
};
</script>

<style scoped lang="scss">
.search-dropdown {
  .item {
    display: flex;
  }
  .dropdown {
    padding: 12px 16px;
    &--icon {
      min-width: 20px;
      height: 20px;
      mask: url("@/assets/images/search.svg");
      mask-size: contain;
      mask-repeat: no-repeat;
      background: var(--light-grey);
    }
    &--search {
      overflow: hidden;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      height: 35px;
      padding: 0 10px;
      border: 1px solid var(--light-grey);
      border-radius: 8px;
      input {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border: none;
        padding: 0;

        font-size: 18px;
        font-weight: 400;
        &::placeholder {
          color: var(--water-link);
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
        }
        &:focus {
          outline: none;
        }
      }
    }
    &--buttons {
      display: flex;
      gap: 20px;
    }

    &--item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 16px;
      color: var(--grey);
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      .item {
        gap: 8px;
        align-items: center;
        text-transform: none;
      }
      &.active {
        background: var(--very-light-blue);
      }
    }
  }
  &:deep(.custom-checkbox) {
    width: 25px;
    height: 25px;
    input {
      width: 25px;
      height: 25px;
    }
  }
  &::v-deep(.drop-down) {
    border: 1px solid var(--secondary_b_c_1);
    &:hover {
      border: 1px solid var(--default-c-1);
    }
    .selected-item {
      padding: 0;
      &--arrow {
        display: none;
        right: 16px;
        width: 16px;
        height: 16px;
        background: var(--secondary_b_t_1);
      }
    }
    .drop-down {
      &--content {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        min-width: 260px;
        border-radius: 6px;
        border: none;
        padding-top: 10px;
        padding-bottom: 20px;
        background: #fff;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
      }
      &--scrollable {
        overflow: auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
        max-height: 225px;

        margin-bottom: 20px;
      }
      &--save {
        display: flex;
        width: 100%;
        justify-content: center;
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
          margin: 0;
          font-size: 14px;
          font-weight: 300;

          transition: scale 0.3s ease;

          .icon {
            width: 14px;
            height: 14px;
            &:before {
              background: white;
            }
          }

          &:hover {
            scale: 1.1;
          }
          &:active {
            scale: 1;
          }
        }
      }
    }
  }
}
</style>
