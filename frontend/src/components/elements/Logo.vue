<template>
   <router-link to="/" class="logo">Overtour</router-link>
</template>

<script lang="ts">
    import {Vue} from 'vue-property-decorator'

    export default class Logo extends Vue {}
</script>

<style lang="stylus">
   .logo
      color #fff
      font-weight 900
      font-size 20px
      padding 16px 16px 16px 0
      text-decoration none
      cursor pointer
</style>
