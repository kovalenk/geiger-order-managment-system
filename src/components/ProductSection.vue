<template lang="pug">
custom-toggle(:is-selected="activeTab === Tabs.Products")
  template(v-slot:head="")
    h4 Product
      span(v-if="selectedProducts.length") ({{ selectedProducts.length }})
    button.action.inter-medium
      i.icon.icon-plus
      | Add new item
    button.action.inter-medium
      i.icon.icon-table
      | Bulk adding
    button.action.gray.inter-medium
      i.icon.icon-plus
      | Create custom option
  template(v-slot:body="")
    .action-bar
      .layout-switcher
        button.active
          i.icon.icon-list
        button
          i.icon.icon-grid
      button.action(@click="resetFilters")
        i.icon.icon-reset
        | Reset all filters
    .table-section
      .header-section
        .table-item.check
          custom-checkbox(
            :isChecked="isEveryChecked",
            @update:check="selectAllItem(isEveryChecked)"
          )
        .table-item.img
        .table-item.first Barrel Color
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.barrel_color }",
            @click="orderBy = OrderKeys.barrel_color"
          )
          .icon-wraper(:class="{ active: selectedBarrels.length }")
            search-dropdown(
              :data="barrels",
              :preselected="selectedBarrels",
              @submit="selectedBarrels = [...$event]"
            )
        .table-item Trim Color
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.trim_color }",
            @click="orderBy = OrderKeys.trim_color"
          )
          .icon-wraper(:class="{ active: selectedTrims.length }")
            search-dropdown(
              :data="barrels",
              :preselected="selectedTrims",
              @submit="selectedTrims = [...$event]"
            )
        .table-item Point Size
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.point_size }",
            @click="orderBy = OrderKeys.point_size"
          )
          .icon-wraper(:class="{ active: selectedSizes.length }")
            search-dropdown(
              :data="sizes",
              :preselected="selectedSizes",
              @submit="selectedSizes = [...$event]"
            )
        .table-item Ink Color
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.ink_color }",
            @click="orderBy = OrderKeys.ink_color"
          )
          .icon-wraper(:class="{ active: selectedInks.length }")
            search-dropdown(
              :data="inks",
              :preselected="selectedInks",
              @submit="selectedInks = [...$event]"
            )
        .table-item QTY
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.qty }",
            @click="orderBy = OrderKeys.qty"
          )
        .table-item NET
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.net }",
            @click="orderBy = OrderKeys.net"
          )
        .table-item SELL
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.sell }",
            @click="orderBy = OrderKeys.sell"
          )
        .table-item TOTAL
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.total }",
            @click="orderBy = OrderKeys.total"
          )
        .table-item.last Margin
          i.icon.icon-switch(
            :class="{ active: orderBy === OrderKeys.margin }",
            @click="orderBy = OrderKeys.margin"
          )
        .table-item.action
      .table-row(
        v-for="(item, key) in productList",
        :key="key",
        :class="{ active: isActive(item.id) }"
      )
        .table-item.check
          custom-checkbox(
            :isChecked="isActive(item.id)",
            @update:check="selectItem(item.id, $event)"
          )
        .table-item.img
          img(
            :src="require(`@/assets/images/products/${item.image}`)",
            :alt="`${item.trim_color}_pen`"
          )
        .table-item.no-events
          custom-drop-down
            template(v-slot:selectedItem)
              span.common-dropdown-selected {{ item.barrel_color }}
        .table-item.no-events
          custom-drop-down
            template(v-slot:selectedItem)
              span.common-dropdown-selected {{ item.trim_color }}
        .table-item.no-events
          custom-drop-down
            template(v-slot:selectedItem)
              span.common-dropdown-selected {{ item.point_size }}
        .table-item.no-events
          custom-drop-down
            template(v-slot:selectedItem)
              span.common-dropdown-selected {{ item.ink_color }}
        .table-item.no-events
          base-input(:value="item.qty")
        .table-item.no-events
          base-input(:value="item.net")
        .table-item.no-events
          base-input(:value="item.sell")
        .table-item
          span ${{ item.total }}
        .table-item
          span {{ item.margin }}%
        .table-item.action
          button.icon.icon-copy
          button.icon.icon-delete
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

import CustomToggle from "@/components/common/CustomToggle.vue";
import CustomCheckbox from "@/components/common/CustomCheckbox.vue";
import CustomDropDown from "@/components/common/CustomDropDown.vue";
import BaseInput from "@/components/BaseInput.vue";
import SearchDropdown from "@/components/common/SearchDropdown.vue";

import { activeTab, Tabs } from "@/composables/tabsActions";
import {
  list,
  orderBy,
  OrderTypes,
  selectedBarrels,
  selectedInks,
  selectedProducts,
  selectedSizes,
  selectedTrims,
  resetFilters,
} from "@/composables/products";

import { BarrelColor } from "@/constants/barrelColor";
import { ProductItemInterface } from "@/types/productItemInterface";
import { getProducts } from "@/services/api/productApi";
import { PointSize } from "@/constants/pointSize";
import { InkColor } from "@/constants/inkColor";

enum OrderKeys {
  barrel_color = "barrel_color",
  trim_color = "trim_color",
  point_size = "point_size",
  ink_color = "ink_color",
  qty = "qty",
  net = "net",
  sell = "sell",
  total = "total",
  margin = "margin",
}

const barrels = computed(() => {
  return Object.keys(BarrelColor);
});
const sizes = computed(() => {
  return Object.keys(PointSize);
});
const inks = computed(() => {
  return Object.keys(InkColor);
});

const isEveryChecked = computed(() => {
  return list.value
    .map((m) => m.id)
    .every((e) => selectedProducts.value.includes(e));
});
const productList = computed(() => {
  const filteredList = list.value.filter((f) => {
    let barrel = true;
    let trim = true;
    let size = true;
    let ink = true;
    if (selectedBarrels.value.length) {
      barrel = selectedBarrels.value.includes(f.barrel_color);
    }
    if (selectedTrims.value.length) {
      trim = selectedTrims.value.includes(f.trim_color);
    }
    if (selectedSizes.value.length) {
      size = selectedSizes.value.includes(f.point_size);
    }
    if (selectedInks.value.length) {
      ink = selectedInks.value.includes(f.ink_color);
    }
    return barrel && trim && size && ink;
  });
  if (orderBy.value) {
    const customSort = (a: ProductItemInterface, b: ProductItemInterface) => {
      const key = orderBy.value as OrderTypes;
      let firstEl: string | number;
      let secondEl: string | number;
      switch (orderBy.value) {
        case OrderKeys.qty:
        case OrderKeys.net:
        case OrderKeys.sell:
        case OrderKeys.total:
        case OrderKeys.margin: {
          firstEl = +a[key];
          secondEl = +b[key];
          break;
        }
        default: {
          firstEl = a[key];
          secondEl = b[key];
        }
      }
      if (firstEl > secondEl) {
        return -1;
      }
      if (firstEl < secondEl) {
        return 1;
      }
      return 0;
    };

    return filteredList.sort(customSort);
  } else {
    return filteredList;
  }
});

const isActive = (id: string) => {
  return selectedProducts.value.includes(id);
};
const selectAllItem = (state: boolean) => {
  if (state) {
    selectedProducts.value = [];
  } else {
    selectedProducts.value = list.value.map((m) => m.id);
  }
};
const selectItem = (id: string, state: boolean) => {
  if (state) {
    selectedProducts.value.push(id);
  } else {
    const index = selectedProducts.value.indexOf(id);
    if (index !== -1) {
      selectedProducts.value.splice(index, 1);
    }
  }
};

onMounted(() => {
  getProducts().then(({ data }: { data: ProductItemInterface[] }) => {
    if (data.length) {
      list.value = data;
    } else {
      list.value = [];
    }
  });
});
</script>

<style scoped lang="scss">
.custom-toggle {
  .toggle {
    .action {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-right: 20px;
      color: var(--blue);
      font-size: 12px;
      font-weight: 500;
      padding: 0;
      gap: 5px;
      border: none;
      background: transparent;

      .icon {
        width: 15px;
        height: 15px;
        &:before {
          background-color: var(--blue);
        }
      }

      &.gray {
        margin: 0;
        color: var(--grey);

        .icon {
          &:before {
            background-color: var(--grey);
          }
        }
      }
    }
  }

  .toggle-content {
    .action-bar {
      display: flex;
      justify-content: space-between;
      width: 100%;

      margin-bottom: 15px;

      .layout-switcher {
        display: flex;
        width: min-content;
        background: var(--very-light-grey);
        border-radius: 8px;

        button {
          cursor: pointer;
          height: 30px;
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          border: none;

          .icon {
            width: 20px;
            height: 20px;
            &:before {
              background: var(--grey);
            }
          }

          &.active {
            background: var(--blue);
            border-radius: 8px;

            .icon {
              &:before {
                background: white;
              }
            }
          }
        }
      }
      .action {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--grey);
        border: none;
        background: transparent;
        .icon {
          width: 15px;
          height: 15px;
          margin-right: 10px;

          &:before {
            background: var(--grey);
          }
        }
      }
    }
    .table-section {
      display: flex;
      flex-direction: column;
      width: 100%;

      .header-section {
        display: grid;
        grid-template-columns:
          20px 40px repeat(2, 1fr) repeat(2, 0.7fr)
          repeat(3, 0.4fr) 0.5fr 0.4fr 0.4fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        padding: 10px;
        width: 100%;

        .table-item {
          min-width: 0;
          overflow: visible;
          position: relative;
          display: flex;
          width: 100%;
          align-items: center;
          gap: 4px;
          text-transform: uppercase;
          white-space: nowrap;
          font-size: 16px;
          font-weight: 400;
          color: var(--water-link);

          &.img {
            display: none;
          }
          &.first {
            grid-area: 1 / 2 / 2 / 4;
          }
          &.last {
            grid-area: 1 / 11 / 2 / 13;
          }

          .icon {
            cursor: pointer;
            width: 20px;
            height: 20px;

            &::before {
              background: var(--water-link);
            }

            &.active {
              &::before {
                background: var(--light-blue);
              }
            }
          }

          .icon-wraper {
            ::v-deep(.search-dropdown) {
              .icon-filter {
                width: 20px;
                height: 20px;
              }
            }

            &.active {
              ::v-deep(.search-dropdown) {
                .icon-filter::before {
                  background: var(--light-blue);
                }
              }
            }
          }
          @media (max-width: 1660px) {
            font-size: 12px;

            .icon {
              width: 12px;
              height: 12px;
            }
            .icon-wraper {
              ::v-deep(.search-dropdown) {
                .icon-filter {
                  width: 12px;
                  height: 12px;
                }
              }
            }
          }
        }
      }
      .table-row {
        box-sizing: border-box;
        display: grid;
        grid-template-columns:
          20px 40px repeat(2, 1fr) repeat(2, 0.7fr)
          repeat(3, 0.4fr) 0.5fr 0.4fr 0.4fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        width: 100%;
        padding: 10px;

        &.active {
          background: var(--very-light-blue);
        }

        .table-item {
          display: flex;
          align-items: center;
          height: 40px;

          span {
            font-size: 16px;
            line-height: 30px;
            font-weight: 300;
            color: black;
          }
          &.img {
            img {
              width: 100%;
              height: 100%;
            }
          }

          &.no-events {
            pointer-events: none;
          }

          &.action {
            display: flex;
            justify-content: center;
            align-items: center;

            button {
              cursor: pointer;
              width: 25px;
              height: 25px;
              margin-right: 10px;
              border: none;
              background: transparent;

              padding: 0;
              &:before {
                background: var(--water-link);
              }
              &.icon-delete {
                margin: 0;
              }
            }
          }
          .common-dropdown-selected {
            color: var(--light-grey);
          }
          @media (max-width: 1660px) {
            span {
              font-size: 12px;
              line-height: unset;
            }
            .custom-input {
              font-size: 12px;
              line-height: unset;
            }
          }
        }
      }
    }

    .no-data {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 120px;
    }
  }
}
</style>
