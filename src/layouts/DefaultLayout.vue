<template>
    <v-app>
      <default-bar />
      <default-view />
      <default-footer/>
    </v-app>
  </template>
  
  <script lang="ts" setup>
    import DefaultBar from './AppBarLayout.vue';
    import DefaultView from './ViewLayout.vue'
    import DefaultFooter from './FooterBarLayout.vue'
  </script>
  