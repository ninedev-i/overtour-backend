<template>
   <div>
      <menuHeader />
      <page :whitePage="true" :padding="true">
         <template #content>
            <h1>Дорожная карта проекта</h1>
            <el-timeline>
               <el-timeline-item
                  v-for="(activity, index) in plan"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.timestamp">
                  {{activity.content}}
               </el-timeline-item>
            </el-timeline>
         </template>
      </page>
   </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import {Timeline, TimelineItem} from 'element-ui';

    @Component({
        title: 'Дорожная карта проекта | Overtour',
        components: {
            page: () => import('../components/elements/Page.vue'),
            menuHeader: () => import('../components/elements/Header.vue'),
            'el-timeline': Timeline,
            'el-timeline-item': TimelineItem,
        }
    })
    export default class Roadmap extends Vue {
        plan = [
            {
                content: 'Агрегатор походов',
                timestamp: '2019-04-12 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
            },
            {
                content: 'Спортивные мероприятия',
                timestamp: '2019-04-03 20:46',
                color: '#0bbd87'
            },
            {
                content: 'Регистрация пользователей',
                timestamp: '2019-04-03 20:46'
            }
        ];
    };
</script>
