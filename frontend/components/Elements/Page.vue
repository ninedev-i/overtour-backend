<template>
   <section >
      <slot name="header"> </slot>
      <div class="page-container">
         <div class="page-content" v-bind:class="{'page-content_whiteBg': whitePage, 'page-content_withPadding': padding, 'page-content_fullWidth': !$slots.sidebar}">
            <slot name="content"> </slot>
         </div>
         <aside class="page-side" v-if="!!$slots.sidebar">
            <slot name="sidebar"> </slot>
         </aside>
      </div>

   </section>
</template>

<script>
   import {Vue, Component, Prop} from 'vue-property-decorator';

   @Component
   export default class PageContainer extends Vue {
      @Prop({type: Boolean, default: false}) whitePage;
      @Prop({type: Boolean, default: false}) padding;
   }
</script>

<style lang="less">
   @import '../../assets/constants';

   .page {
      &-container {
         display: flex;
         margin-top: 75px;
         flex-direction: row;
         justify-content: center;
         width: 100%;
      }

      &-content {
         width: 1024px;

         h1 {
            font-size: 22px;
            margin-bottom: 12px;
         }

         &_whiteBg {
            background-color: @page-background;
         }
         &_withPadding {
            padding: @page-padding;
            width: calc(1024px - 32px);
         }
         &_fullWidth {
            width: calc(1280px - 32px);
         }
      }

      &-side {
         width: 240px;
         margin-left: 12px;
         display: flex;
         flex-direction: column;
      }
   }
</style>
