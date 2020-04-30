<template>
   <nuxt-link to="/" class="logo">Overtour</nuxt-link>
</template>

<script lang="ts">
   import {Vue} from 'vue-property-decorator'

   export default class Logo extends Vue {}
</script>

<style lang="less">
   @import '../../assets/constants';

   .logo {
      color: #fff;
      font-weight: 900;
      font-size: 20px;
      padding: 16px 16px 16px 0;
      text-decoration: none;
      cursor: pointer;
   }
</style>
