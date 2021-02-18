<template>
   <div>
      <menuHeader />
      <page :whitePage="true" :padding="true">
         <template #content>
            <h1>Админка</h1>
            <el-button size="mini" :loading="dataLoadingId === 1" @click="getData(1)">Получить данные strannik</el-button>
            <el-button size="mini" :loading="dataLoadingId === 2" @click="getData(2)">Получить данные vpoxod</el-button>
            <el-button size="mini" :loading="dataLoadingId === 3" @click="getData(3)">Получить данные perexod</el-button>
            <el-button size="mini" :loading="dataLoadingId === 4" @click="getData(4)">Получить данные pik</el-button>
            <el-button size="mini" :loading="dataLoadingId === 5" @click="getData(5)">Получить данные myway</el-button>
            <el-button size="mini" :loading="dataLoadingId === 'all'" type="success" @click="showAllDrafts()">показать все черновики</el-button>

            <el-table
               :data="tours"
               stripe
               style="width: 100%">
               <el-table-column
                  type="index"
                  label="№"
                  :index="indexMethod"
               />
               <el-table-column
                  prop="title"
                  label="Заголовок"
               />
               <el-table-column
                  label="C"
                  width="140">
                  <template slot-scope="scope">{{dayjs(scope.row.date_from).format('D MMMM YYYY')}}</template>
               </el-table-column>
               <el-table-column
                  label="По"
                  width="140">
                  <template slot-scope="scope">{{dayjs(scope.row.date_to).format('D MMMM YYYY')}}</template>
               </el-table-column>
               <el-table-column
                  label="Ссылка">
                  <template slot-scope="scope">
                     <a :href="scope.row.link" target="_blank" class="admin-table__link">{{scope.row.link}}</a>
                  </template>
               </el-table-column>
               <el-table-column
                  align="right"
                  width="120">
                  <template slot-scope="scope">
                     <el-button
                        size="mini"
                        :disabled="scope.row.type !== 'draft'"
                        :loading="!scope.row.type"
                        @click="parseTour(scope.row)">
                           {{scope.row.type === 'added' ? 'Готово' : 'Парсить'}}
                        </el-button>
                  </template>
               </el-table-column>
            </el-table>
         </template>
      </page>
   </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Button, Notification, Table, TableColumn} from 'element-ui';
    import {dayjs} from '../util/dayjs';
    import {Axios} from '../util/axios';

    interface IDraftData {
        id: number;
        title: string;
        date_from: string;
        date_to: string;
        club: number;
        link: string;
        type: ('draft'|'added'|'ignored'|null);
    }

    interface IOutput {
        tours?: IDraftData[];
        report?: {
            found: number;
            unique: number;
            broken: number;
        }
    }

    @Component({
        title: 'Админка | Overtour',
        components: {
            page: () => import('../components/elements/Page.vue'),
            menuHeader: () => import('../components/elements/Header.vue'),
            'el-button': Button,
            'el-table': Table,
            'el-table-column': TableColumn,
        }
    })
    export default class Admin extends Vue {
        tours: IDraftData[] = [];
        report: {
           found: number;
           unique: number;
           broken: number;
        } = {
           found: 0,
           unique: 0,
           broken: 0,
        };

        dataLoadingId: number|null|'all' = null;

        dayjs() {
            return dayjs;
        }

        indexMethod(index: number) {
            return index++;
        }

        async getData(clubId: number) {
            this.tours = [];
            this.dataLoadingId = clubId;
            const {tours, report} = await Axios
                .post('crawler/get_club_tours', {club: clubId})
                .then((res) => res.data);

            this.tours = tours;
            this.report = report;

            this.dataLoadingId = null;
            let message = `<b>найдено</b>: ${this.report.found}<br /> <b>добавлено</b>: ${this.report.unique}`;
            if (this.report.broken) {
                message += `<br /><b>с ошибками</b>: ${this.report.broken}`;
            }
            Notification.success({
                title: '',
                dangerouslyUseHTMLString: true,
                message,
                position: 'bottom-right',
                duration: 0
            })
        }

        async parseTour(tourInfo: IDraftData) {
            tourInfo.type = null;

            return Axios
               .post('crawler/get_tour_detail', {tourInfo})
               .then(({data}) => {
                  this.tours = this.tours.slice(0).map((item) => {
                     if (item && item.id === data.id) {
                        item = data;
                     }
                     return item;
                  });
               })
        }

        async showAllDrafts(): Promise<void> {
            this.dataLoadingId = 'all';
            this.tours = await Axios.get('get_all_drafts').then(res => res.data);
            this.dataLoadingId = null;
        }
    };
</script>

<style lang="stylus" scoped>
   @import '../assets/constants';

   .admin
      &-table__link
         overflow hidden
         text-overflow ellipsis
         white-space nowrap

         &:hover
            color #9acd32
</style>
