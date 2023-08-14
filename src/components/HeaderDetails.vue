<template lang="pug">
.header-details
  .detail-item(v-for="(item, key) in details", :key="key")
    h6.title-name.inter-regular {{ item.name }}
    p.text-detail.inter-semi-bold {{ item.value }}
  button.inter-semi-bold pending
</template>

<script lang="ts" setup>
const details = [
  {
    name: "order",
    value: 19,
  },
  {
    name: "customer",
    value: "Geiger testing",
  },
  {
    name: "created",
    value: "May 12 2023",
  },
  {
    name: "margin",
    value: "$32.15%",
  },
  {
    name: "total",
    value: "$2317.65 USD",
  },
];
</script>

<style scoped lang="scss">
.header-details {
  display: flex;

  padding: 0 32px 0 0;

  width: 100%;
  height: 50px;
  min-height: 50px;

  border-bottom: 2px solid #eaeaea;

  .title-name {
    font-size: 12px;
    color: #c3c3c3;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  .text-detail {
    font-size: 14px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;

    flex: 1 1 auto;
  }

  button {
    width: fit-content;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: var(--yellow);
    text-transform: uppercase;
    border: none;
    cursor: pointer;

    font-size: 13px;
  }
}
</style>
