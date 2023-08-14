<template lang="pug">
.sidebar(:class="{ closed: !isSidebarOpen }")
  a.sidebar--title(href="/")
    img(:src="require('@/assets/logo.png')", alt="Web logo")
    img.toggle(
      :src="require('@/assets/logo-toggle.svg')",
      alt="Web logo toggle"
    )
  ul.navigation
    li.navigation--item(
      v-for="item in navigation",
      :class="[{ active: router.currentRoute.value.fullPath.includes(item.route) }]"
    )
      router-link.link.inter-medium(:to="item.route")
        i.icon(:class="[`icon-${item.image}`]")
        | {{ item.name }}
  button.sidebar--control.icon.icon-resize(
    @click="isSidebarOpen = !isSidebarOpen"
  )
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { isSidebarOpen } from "@/composables/sidebarActions";

const router = useRouter();

const navigation = ref([
  {
    name: "Orders",
    route: "/orders",
    image: "cart",
  },
  {
    name: "Users",
    route: "/users",
    image: "users",
  },
  {
    name: "Customers",
    route: "/customers",
    image: "case",
  },
  {
    name: "Products",
    route: "/products",
    image: "folder",
  },
  {
    name: "Reports",
    route: "/reports",
    image: "chart",
  },
  {
    name: "Organizations",
    route: "/organizations",
    image: "buildings",
  },
  {
    name: "Groups",
    route: "/groups",
    image: "tree-diag",
  },
  {
    name: "Task center",
    route: "/task-center",
    image: "check",
  },
]);
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 248px;
  min-width: 248px;
  height: 100%;
  padding: 24px 16px;

  background: var(--sidebar-blue);

  transition: all 0.2s ease;

  &--title {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 60px;

    margin-bottom: 32px;
    margin-top: 20px;

    img {
      max-height: 50px;

      &.toggle {
        display: none;
      }
    }
  }
  &--logo {
    display: block;
    height: 100%;
    width: 100%;

    mask-size: contain;
    mask-repeat: no-repeat;

    background: var(--grey);
  }
  .navigation {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    gap: 7px;

    transition: all 0.2s ease;

    &--item {
      display: flex;
      width: 100%;
      border-radius: 8px;

      transition: all 0.2s ease;

      .icon {
        display: block;
        width: 20px;
        height: 20px;
        &:before {
          background: white;
        }
      }

      .link {
        cursor: pointer;
        display: flex;
        align-items: center;

        gap: 15px;
        width: 100%;
        padding: 10px 20px;

        text-decoration: none;
        font-size: 14px;
        line-height: 20px;
        text-align: left;
        color: white;
        white-space: nowrap;

        transition: all 0.2s ease;
      }

      &.active {
        background: var(--blue);
      }
    }
  }
  &--control {
    cursor: pointer;
    display: block;
    width: 30px;
    height: 30px;
    border: none;
    background: transparent;

    &:before {
      background: var(--light-grey);
    }
  }
  &.closed {
    min-width: 60px;
    max-width: 60px;
    padding: 24px 10px;
    .sidebar--title {
      img {
        display: none;

        &.toggle {
          display: block;
          max-height: 40px;
        }
      }
    }
    .navigation {
      &--item {
        width: min-content;
        .link {
          padding: 10px;
          width: min-content;
          gap: 0;
          font-size: 0;
        }
      }
    }
  }
}
</style>
