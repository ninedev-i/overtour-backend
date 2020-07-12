<template>
   <section class="index_container">
      <div class="index_filterLine">
         <filterLine />
      </div>
   </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    @Component({
        title: 'Overtour',
        // async asyncData ({ store }) {
        //   await store.dispatch('users/fetchData');
        // },
        components: {
            filterLine: () => import('../components/filter/Line.vue')
        }
    })
    export default class Home extends Vue {
        visitCounter: number | null = null;
    };
</script>

<style lang="stylus">
   .index
      &_container
         display flex
         justify-content center
         background-image url('/public/common/bg_forest.jpg')
         background-position center
         background-size cover

      &_filterLine
         height 100vh
         width 100%
         display flex
         justify-content center
         flex-direction column
</style>