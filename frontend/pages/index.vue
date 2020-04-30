<template>
   <section class="index_container">
      <div class="index_filterLine">
         <filterLine />
      </div>
   </section>
</template>

<script lang="ts">
   import {Vue, Component} from 'vue-property-decorator'
   import filterLine from '~/components/Filter/Line.vue'

   @Component({
      components: {
         filterLine
      }
   })
   export default class IndexPage extends Vue {}
</script>

<style lang="less">
   .index {
      &_container {
         display: flex;
         justify-content: center;
         background-image: url('../assets/bg_forest.jpg');
         background-position: center;
         background-size: cover;
      }
      &_filterLine {
         height: 100vh;
         width: 100%;
         display: flex;
         justify-content: center;
         flex-direction: column;
      }
   }
</style>
