<template>
   <div>
      <menuHeader />
      <page :whitePage="false">
         <template #content>
            <main>
               <div :class="view === 'tile' ? 'tours-tile' : ''">
                  <article v-for="(tour, i) in tours" :key="`event_${i}`" class="tour">
                     <listView v-if="view === 'list'" :event="tour" />
                     <tileView v-else :event="tour" />
                  </article>
                  <div v-if="!tours || !tours.length" class="tours-listEmpty">
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
    import {State} from 'vuex-class';
    const namespace: string = 'tours';

    @Component({
        title: 'Походы | Overtour',

        components: {
            menuHeader: () => import('../components/elements/Header.vue'),
            page: () => import('../components/elements/Page.vue'),
            filterSide: () => import('../components/filter/Side.vue'),

            tileView: () => import('../components/Tour/TileView.vue'),
            listView: () => import('../components/Tour/ListView.vue'),
        },


        // async asyncData({/*$axios, */store}) {
        //    const {date_from, date_to, region, tags} = store.state.eventsFilter;
        //    if (date_from || date_to || region || tags) {
        //       await store.dispatch('getEventsFilter');
        //       await store.dispatch('getEvents', {});
        //    } else {
        //       const info = await $axios
        //          .$get('get_tours')
        //          .then(res => res.data)
        //          .catch(() => {
        //             console.error('Не удалось получить список походов');
        //             return [];
        //          });
        //       store.commit('setEvents', info);
        //    }
        // }
    })
    export default class ToursPage extends Vue {
        @State('tours', {namespace}) tours: any;
        view = 'tile';

        toggleView() {
            this.view = this.view === 'list' ? 'tile' : 'list';
        }
    }
</script>

<style lang="stylus">
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
