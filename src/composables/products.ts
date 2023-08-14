import { ref } from "vue";
import { Tabs } from "@/composables/tabsActions";
import { ProductItemInterface } from "@/types/productItemInterface";

export type OrderTypes = keyof ProductItemInterface;

export const list = ref<ProductItemInterface[]>([]);
export const selectedProducts = ref<string[]>([]);

export const selectedBarrels = ref<string[]>([]);
export const selectedTrims = ref<string[]>([]);
export const selectedSizes = ref<string[]>([]);
export const selectedInks = ref<string[]>([]);
export const orderBy = ref<OrderTypes | "">("");

export const itemsCount = (key: string) => {
  switch (key) {
    case Tabs.Products: {
      return list.value.length;
    }
    default: {
      return 0;
    }
  }
};

export const resetFilters = () => {
  selectedBarrels.value = [];
  selectedTrims.value = [];
  selectedSizes.value = [];
  selectedInks.value = [];
  selectedProducts.value = [];
  orderBy.value = "";
};
