<template>
   <router-link :to="`/tours/${event.id}`" :class="`tileView ${isClosed ? 'closed' : ''}`">
      <div class="tileView__image" :alt="event.title" :title="event.title" :style="`background-image: url(${event.image})`"></div>
      <div class="tileView__title">{{event.title}}</div>
      <div class="tileView__info">
         <!--<div class="tileView__label">Даты похода:</div>-->
         <div>
            <span>{{period(event.date_from, event.date_to)}} ({{event.duration}} {{declOfNum(event.duration)}})</span>
         </div>
         <!--<hr />-->
         <!--<div class="tileView__label">Стоимость:</div>-->
         <div>{{triads(event.price)}} ₽ <!--{{getPricePerDay(event.price, event.duration)}}--></div>
      </div>
   </router-link>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'

    @Component({
        computed: {
            isClosed() {
                return +new Date(this.event.date_from) < new Date().setHours(0,0,0,0);
            }
        }
    })
    export default class TileView extends Vue {
        @Prop({type: Object, default: {}}) event: boolean;

        declOfNum(val: number) {
            let cases = [2, 0, 1, 1, 1, 2];
            return ['день', 'дня', 'дней'][(val % 100 > 4 && val % 100 < 20)
                ? 2
                : cases[(val % 10 < 5) ? val % 10 :5]];
        }

        triads(amount: number) {
            const val = amount + '';
            return val.replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, ' $1 ');
        }

        getPricePerDay(price: number, days: number): string {
            return days > 1 ? `(${this.triads(Math.round(price / days))} ₽ в день)` : '';
        }
    }
</script>

<style lang="stylus">
   @import '../../assets/constants.styl';

   .tileView
      display inline-block
      width 240px !important
      height 310px
      background-color $page-background
      margin-bottom 20px
      text-decoration none
      color $text-color

      &:hover
         cursor pointer
         background #fbfff4
         box-shadow 0 2px 8px 0 rgba(0,0,0,.1)

      &.closed
         color #ababab

      &__image
         height 160px
         width 100%
         background-size cover
         background-position center
         position relative
         flex-shrink 0

      &__title
         font-weight bold
         font-size 16px
         padding 6px 12px

      &__info
         display flex
         flex-direction column
         justify-content center
         flex-shrink 0
         padding 0 12px 8px 12px
         font-size 15px
         color #868686

         div
            margin-bottom 6px
</style>
