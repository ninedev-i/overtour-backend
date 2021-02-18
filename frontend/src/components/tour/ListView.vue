<template>
   <router-link :to="`/tours/${event.id}`" :class="`listView ${isClosed ? 'closed' : ''}`">
      <div class="listView__image" :alt="event.title" :title="event.title" :style="`background-image: url(${event.image})`"></div>
      <div class="listView__text">
         <div class="listView__title">{{event.title}}</div>
         <div class="listView__description">{{event.description}}</div>
      </div>
      <div class="listView__info">
         <div class="listView__label">Регион:</div>
         <div>{{event.region}}</div>
         <hr />
         <div class="listView__label">Продолжительность:</div>
         <div>{{event.duration}} {{declOfNum(event.duration)}}</div>
         <hr />
         <div class="listView__label">Даты похода:</div>
         <div v-if="event.date_from === event.date_to">
            {{formatDate(event.date_to,'D.MM.YYYY')}}
         </div>
         <div v-else-if="formatDate(event.date_from, 'MM') === formatDate(event.date_to, 'MM')">
            {{formatDate(event.date_from ,'D')}} – {{formatDate(event.date_to, 'D.MM.YYYY')}}
         </div>
         <div v-else>{{formatDate(event.date_from, 'D.MM.YYYY')}} – {{formatDate(event.date_to, 'D.MM.YYYY')}}</div>
         <hr />
         <div class="listView__label">Стоимость:</div>
         <div>{{triads(event.price)}} ₽ {{getPricePerDay(event.price, event.duration)}}</div>
      </div>
   </router-link>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import {dayjs} from '../../util/dayjs';

    @Component({
        computed: {
            isClosed(): boolean {
                return +new Date(this.event.date_from) < new Date().setHours(0,0,0,0);
            }
        }
    })
    export default class ListViewView extends Vue {
        @Prop({type: Object, default: {}}) event: boolean;

        declOfNum(number: number) {
            let cases = [2, 0, 1, 1, 1, 2];
            return ['день', 'дня', 'дней'][(number % 100 > 4 && number % 100 < 20)? 2 : cases[(number % 10 < 5) ? number % 10 :5]];
        }

        formatDate(date: Date, format: string): string {
            return dayjs(date).format(format);
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

   .listView
      display flex
      flex-direction row
      margin-bottom 12px
      width 100%
      max-height 180px
      background-color @page-background
      font-size 15px
      overflow hidden
      text-decoration none
      color @text-color

      &:hover
         cursor pointer
         background #fbfff4
         box-shadow 0 2px 8px 0 rgba(0,0,0,.1)

      &.closed
         color #ababab

      &__image
         height 180px
         width 260px
         background-size cover
         background-position center
         position relative
         flex-shrink 0

      &__text
         padding 6px 6px 6px 12px

      &__description
         margin-top 6px

      &__title
         font-weight bold
         font-size 18px

      &__info
         display flex
         flex-direction column
         justify-content center
         flex-shrink 0
         width 175px
         padding 6px 12px 6px 6px
         font-size 13px

      &__label
         color #cacaca
</style>
