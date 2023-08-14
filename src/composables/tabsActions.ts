import { ref } from "vue";

export enum Tabs {
  Products = "Products",
  Decoration = "Decoration",
  Changes = "Changes",
  Shipping = "Shipping",
  Vendor = "Vendor",
  Safety = "Safety",
  Services = "Services",
  Summary = "Summary",
}

export const activeTab = ref<Tabs>(Tabs.Products);
