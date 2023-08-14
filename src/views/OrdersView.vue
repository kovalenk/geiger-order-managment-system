<template lang="pug">
.main-view
  header-details
  .main-section
    .nav-section
      .nav-item(
        v-for="(item, key) in Tabs",
        @click="goToItem(key)",
        :key="key",
        :class="{ active: item === activeTab }"
      )
        p.nav-name.inter-regular {{ item }}
          span.inter-regular(v-if="itemsCount(item)") {{ itemsCount(item) }}
    .items
      .product-details
        .left
          h3.title-text.inter-semi-bold Clic Stic® Pen
          p.gray-text.inter-regular 506058
        .right
          i.icon.icon-inform
          p.text-inform.inter-medium Vendor product details
      product-section(ref="productsRef")
      custom-toggle(
        :is-selected="activeTab === Tabs.Decoration",
        ref="decorationRef"
      )
        template(v-slot:head="")
          h4 Decoration
        template(v-slot:body="")
          .no-data No Data
      custom-toggle(
        :is-selected="activeTab === Tabs.Changes",
        ref="changesRef"
      )
        template(v-slot:head="")
          h4 Changes
        template(v-slot:body="")
          .no-data No Data
      custom-toggle(
        :is-selected="activeTab === Tabs.Shipping",
        ref="shippingRef"
      )
        template(v-slot:head="")
          h4 Shipping
        template(v-slot:body="")
          .no-data No Data
      custom-toggle(:is-selected="activeTab === Tabs.Vendor", ref="vendorRef")
        template(v-slot:head="")
          h4 Vendor
        template(v-slot:body="")
          .no-data No Data
      custom-toggle(:is-selected="activeTab === Tabs.Safety", ref="safetyRef")
        template(v-slot:head="")
          h4 Safety
        template(v-slot:body="")
          .no-data No Data
      custom-toggle(
        :is-selected="activeTab === Tabs.Services",
        ref="servicesRef"
      )
        template(v-slot:head="")
          h4 Services
        template(v-slot:body="")
          .no-data No Data
      custom-toggle(
        :is-selected="activeTab === Tabs.Summary",
        ref="summaryRef"
      )
        template(v-slot:head="")
          h4 Summary
        template(v-slot:body="")
          .no-data No Data
  footer-details(v-if="selectedProducts.length")
</template>

<script lang="ts" setup>
import { ref } from "vue";

import CustomToggle from "@/components/common/CustomToggle.vue";
import HeaderDetails from "@/components/HeaderDetails.vue";
import FooterDetails from "@/components/FooterDetails.vue";

import ProductSection from "@/components/ProductSection.vue";
import { activeTab, Tabs } from "@/composables/tabsActions";
import { itemsCount, selectedProducts } from "@/composables/products";

type RefItem = {
  $el: {
    scrollIntoView: (obj: { behavior: string; block: string }) => void;
  };
};

const productsRef = ref<RefItem>();
const decorationRef = ref<RefItem>();
const changesRef = ref<RefItem>();
const shippingRef = ref<RefItem>();
const vendorRef = ref<RefItem>();
const safetyRef = ref<RefItem>();
const servicesRef = ref<RefItem>();
const summaryRef = ref<RefItem>();

const goToItem = (key: Tabs) => {
  let currentRef: RefItem;
  activeTab.value = key;
  switch (key) {
    case Tabs.Products: {
      currentRef = productsRef.value!;
      break;
    }
    case Tabs.Decoration: {
      currentRef = decorationRef.value!;
      break;
    }
    case Tabs.Changes: {
      currentRef = changesRef.value!;
      break;
    }
    case Tabs.Shipping: {
      currentRef = shippingRef.value!;
      break;
    }
    case Tabs.Vendor: {
      currentRef = vendorRef.value!;
      break;
    }
    case Tabs.Safety: {
      currentRef = safetyRef.value!;
      break;
    }
    case Tabs.Services: {
      currentRef = servicesRef.value!;
      break;
    }
    case Tabs.Summary: {
      currentRef = summaryRef.value!;
      break;
    }
  }
  currentRef!.$el.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
};
</script>

<style scoped lang="scss">
.main-view {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: 100%;
  max-height: 100%;

  .main-section {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 55px;

    .nav-section {
      display: flex;

      padding: 0 35px;

      border-bottom: 2px solid #dcdbdb;

      .nav-item {
        flex: 1 1 auto;
        align-items: center;
        min-height: 50px;

        .nav-name {
          display: flex;
          justify-content: center;

          padding: 15px 0 15px 0;

          font-size: 14px;
          line-height: 20px;

          color: #c3c3c3;

          span {
            padding: 3px 5px;
            margin-left: 5px;

            color: #838282;

            font-size: 12px;
            line-height: 16px;

            background-color: #d7d7d7;
            border-radius: 6px;
          }
        }

        &.active {
          .nav-name {
            color: black;
            border-bottom: 2px solid #1bc4f8;

            span {
              color: white;
              background-color: #1bc4f8;
            }
          }
        }
      }
    }
  }

  .items {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 30px;
    max-height: 100%;
    padding: 20px 30px 70px;
    background: var(--default-background);
    overflow: auto;

    .product-details {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 15px 32px;
      box-sizing: border-box;

      .left {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .title-text {
          font-size: 18px;
          color: black;
        }
        .gray-text {
          font-size: 14px;
          color: #888888;
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 5px;

        .text-inform {
          font-size: 13px;
          color: #888888;
        }

        .icon {
          &-inform {
            mask-image: url("@/assets/images/information.svg");
          }
        }
      }
    }

    .custom-toggle {
      .toggle {
        .action {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-right: 20px;
          color: var(--blue);
          font-size: 12px;
          font-weight: 300;
          padding: 0;
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
            font-weight: 500;
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
              .icon-wrapper {
                width: 15px;
                height: 15px;
              }
              .icon {
                cursor: pointer;
                width: 15px;
                height: 15px;

                &:before {
                  background: var(--water-link);
                }
              }
              .icon-filter {
                &:before {
                  background: var(--light-blue);
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
                  background: black;
                }
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
  }
}
</style>
