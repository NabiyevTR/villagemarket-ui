<template>
  <v-menu
      open-on-hover
      bottom
      offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn

          v-bind="attrs"
          v-on="on"
          color="orange darken-3"
          text
      >
        Admin
      </v-btn>
    </template>

    <v-list>
      <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.link"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: 'AdminMenu',
  data: () => ({
    selectedItem: 1,
    items: [
      {title: 'Users', link: '/cms/user/'},
    ],
  }),
}
</script>