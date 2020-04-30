<template>
   <header class="header">
      <logo />
      <filterLine :withRequests="true" />
   </header>
</template>

<script>
   import {Vue, Component} from 'vue-property-decorator'
   import logo from '~/components/Elements/Logo';
   import filterLine from '~/components/Filter/Line';

   @Component({
      components: {
         logo,
         filterLine
      }
   })
   export default class menuHeader extends Vue {}
</script>

<style lang="less">
   @import '../../assets/constants';

   .header {
      width: 100%;
      z-index: 100;
      position: fixed;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      top: 0;
      background-color: @main-color;
      height: 63px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);

      .filterLine_submit {
         border-right: 1px solid #F5F5F5;
         border-top: 1px solid #F5F5F5;
         border-bottom: 1px solid #F5F5F5;
      }
   }
</style>
