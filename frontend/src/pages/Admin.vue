<template>
   <div>
      <menuHeader />
      <page :whitePage="true" :padding="true">
         <template #content>
            <h1>Админка</h1>
            <button @click="getData(1)">Получить данные strannik</button>
            <button @click="getData(2)">Получить данные vpoxod</button>
            <button @click="getData(3)">Получить данные perexod</button>
            <button @click="getData(4)">Получить данные pik</button>
            <button @click="getData(5)">Получить данные myway</button>
            <div v-show="isLoading">Загрузка данных</div>
            <div v-if="output.report">Найдено {{output.report.found}}, добавлено {{output.report.unique}}, с ошибками {{output.report.broken}}.</div>

            <el-table
               :data="output.tours"
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
                  width="120">
                  <template slot-scope="scope">{{moment(scope.row.date_from).format('D MMMM YYYY')}}</template>
               </el-table-column>
               <el-table-column
                  label="По"
                  width="120">
                  <template slot-scope="scope">{{moment(scope.row.date_to).format('D MMMM YYYY')}}</template>
               </el-table-column>
               <el-table-column
                  label="Ссылка">
                  <template slot-scope="scope">
                     <a :href="scope.row.link" target="_blank" class="admin-table__link">{{scope.row.link}}</a>
                  </template>
               </el-table-column>
               <el-table-column
                  prop="type"
                  label="Тип"
                  width="70"
               />
               <el-table-column
                  width="100">
                  <template>
                     <el-tag
                        type="primary"
                        @click="parseTour"
                        disable-transitions>Парсить</el-tag>
                  </template>
               </el-table-column>
            </el-table>
         </template>
      </page>
   </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import {Button, Table, TableColumn, Notification} from 'element-ui';
    import {Axios} from '../util/axios';

    interface IOutput {
        tours?: object[];
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
        output: IOutput = {
            tours: [],
            report: {
                found: 0,
                unique: 0,
                broken: 0,
            }
        };
        isLoading: boolean = false;

        indexMethod(index: number) {
            return index++;
        }

        async getData(clubId: number) {
            this.output = {};
            this.isLoading = true;
            this.output = await Axios
                .post('crawler/get_club_tours', {club: clubId})
                .then((res) => res.data);
            this.isLoading = false;
            let message = `<b>найдено</b>: ${this.output.report.found}<br /> <b>добавлено</b>: ${this.output.report.unique}`;
            if (this.output.report.broken) {
                message += `<br /><b>с ошибками</b>: ${this.output.report.broken}`;
            }
            Notification.success({
                title: '',
                dangerouslyUseHTMLString: true,
                message,
                position: 'bottom-right',
                duration: 0
            })
        }

        async parseTour(/*id: number*/) {
            // debugger
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
</style>
