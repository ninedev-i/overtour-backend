<template>
   <div>
      <menuHeader />
      <page :whitePage="false">
         <template #content>
            <main>
               <div :class="view === 'tile' ? 'tours-tile' : ''">
                  <article v-for="(event, i) in $store.state.events" :key="`event_${i}`" class="tour">
                     <!--<listView v-if="view === 'list'" :event="event" />
                     <tileView v-else :event="event" />-->
                  </article>
                  <div v-if="!$store.state.events.length" class="tours-listEmpty">
                     <h3>По вашему запросу ничего не найдено</h3>
                     <p>Попробуйте изменить параметры фильтрации</p>
                  </div>
               </div>
            </main>
         </template>

         <template #sidebar>
            <filterSide @changeview="toggleView()" />
         </template>
      </page>
   </div>
</template>

<script lang="ts">
   import {Vue, Component} from 'vue-property-decorator'
   import menuHeader from '~/components/Elements/Header.vue';
   import page from '~/components/Elements/Page.vue';
   import filterSide from '~/components/Filter/Side.vue';
   // import listView from '~/components/Tour/ListView';
   // import tileView from '~/components/Tour/TileView';

   @Component({
      head: {
         title: 'Походы | Overtour'
      },

      components: {
         menuHeader,
         page,
         filterSide,
         // listView,
         // tileView,
      },

      async asyncData({$axios, store}) {
         const {date_from, date_to, region, tags} = store.state.eventsFilter;
         if (date_from || date_to || region || tags) {
            await store.dispatch('getEventsFilter');
            await store.dispatch('getEvents', {});
         } else {
            const info = await $axios
               .$get('get_tours')
               .then(res => res.data)
               .catch(() => {
                  console.error('Не удалось получить список походов');
                  return [];
               });
            store.commit('setEvents', info);
         }
      }
   })
   export default class ToursPage extends Vue {
      view = 'tile';

      toggleView() {
         this.view = this.view === 'list' ? 'tile' : 'list';
      }
   }
</script>

<style lang="less" scoped>
   @import '../../assets/constants';

   .tours {
      // TODO: Перенести эту логику внутрь дочернего компонент
      &-tile {
         .tour {
            display: inline-block;
            height: 310px;
            vertical-align: top;
            margin-bottom: 14px;
            margin-right: 21px;

            &:nth-child(4n + 1) {
               margin-right: 22px;
            }

            &:nth-child(4n + 4) {
               margin-right: 0;
            }
         }
      }

      &-listEmpty {
         text-align: center;
         margin: 10px;

         h3 {
            margin-bottom: 12px;
         }
      }
   }
</style>
