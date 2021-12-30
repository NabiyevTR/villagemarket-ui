<template>
  <v-menu open-on-hover bottom offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" to="/product" text color="white">
        Shop
      </v-btn>
    </template>
    <v-list color='green darken-2'>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link" color='white'>
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: "ShopMenu",
  data: () => ({
    selectedItem: 1,
    items: [
      { title: "Fruits", link: "/product/fruits" },
      { title: "Vegetables", link: "/product/vegetables" },
    ],
  }),
};
</script>