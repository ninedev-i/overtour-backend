<template>
   <div class="filterLine">
      <el-select
            class="filterLine_type"
            v-model="tags"
            placeholder="Вид похода"
            :clearable="true">
         <el-option
               v-for="(item, i) in directions"
               :key="`dirs_${i}`"
               :label="item.caption"
               :value="item.value">
         </el-option>
      </el-select>

      <el-date-picker
            class="filterLine_date"
            v-model="dateValue"
            type="daterange"
            start-placeholder="Когда"
            format="d.MM.yyyy"
            value-format="yyyy-MM-dd"
            :range-separator="`${dateValue[0] ? '–' : ''}`"
            :picker-options="datePickerOptions"
      />

      <el-autocomplete
            class="filterLine_direction"
            placeholder="Куда"
            v-model="region"
            :fetch-suggestions="querySearch"
      />

      <el-button
            class="filterLine_submit"
            type="success"
            icon="el-icon-search"
            @click="searchEvents">
         Найти
      </el-button>
   </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import {Autocomplete, Button, DatePicker, Option, Select, Notification} from 'element-ui';
    import {Mutation, State, Action} from 'vuex-class';
    import {Axios} from '../../util/axios';
    const namespace: string = 'tours';

    @Component({
        components: {
            'el-button': Button,
            'el-select': Select,
            'el-option': Option,
            'el-autocomplete': Autocomplete,
            'el-date-picker': DatePicker,
        },
        async mounted() {
            this.regions = await Axios
                .get('get_regions')
                .then((res: {data: object}) => res.data)
                .catch((error): string[] => {
                    Notification.error({
                        title: 'Ошибка',
                        message: 'Не удалось загрузить регионы',
                        position: 'bottom-right'
                    })
                    console.log(error);
                    return [];
                });
        }
    })
    export default class FilterLine extends Vue {
        @State('filter', {namespace}) filter: any;
        @Action('getTours', {namespace}) getTours: Function;
        @Mutation('setFilterTags', {namespace}) setFilterTags: Function;
        @Mutation('setFilterDate', {namespace}) setFilterDate: Function;
        @Mutation('setFilterRegion', {namespace}) setFilterRegion: Function;

        now = new Date();
        date_from: string|Date = null;
        date_to: string|Date = null;
        datePickerOptions = {
            firstDayOfWeek: 1
        };
        directions = [
            {value: 'weekend', caption: 'Выходного дня'},
            {value: 'water', caption: 'Водный'},
            {value: 'hiking', caption: 'Пеший'},
            {value: 'mountain', caption: 'Горный'},
            {value: 'ski', caption: 'Лыжный'},
            {value: 'sailing', caption: 'Парусный'},
            {value: 'speleo', caption: 'Спелео'},
            {value: 'auto', caption: 'Авто'},
            {value: 'moto', caption: 'Мото'},
            {value: 'combined', caption: 'Комбинированный'},
        ];
        regions: any = [];

        searchEvents() {
            //    this.$store.commit('setEventsFilter', {date_from: this.dateValue[0], date_to: this.dateValue[1], region: this.region, tags: this.tags});
            //    if (this.$attrs.withRequests) {
            this.getTours({date_from: this.dateValue[0], date_to: this.dateValue[1], region: this.region, tags: this.tags});

            if (this.$router.currentRoute.path !== '/tours') {
                this.$router.push({path: '/tours'});
            }
        }

        querySearch(searchString: string, cb: Function) {
            const arr = this.filterRegions(searchString);
            const results = searchString ? this.regions.filter(arr) : this.regions;
            cb(results);
        }

        filterRegions(queryString: string) {
            return (link: {value: string})  => {
                return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        }

        get region(): string {
            return this.filter.region;
        }

        set region(value) {
            this.setFilterRegion(value);
        }

        get dateValue(): Date[] {
            const {date_from, date_to} = this.filter;
            return [date_from, date_to];
        }

        set dateValue(value) {
            const dateArray = value || ['', ''];
            this.setFilterDate(dateArray)
        }

        get tags(): string {
            return this.filter.tags;
        }

        set tags(value: string) {
            this.setFilterTags(value);
        }
    }
</script>

<style lang="stylus">
   @import '../../assets/constants.styl';

   .filterLine
      display flex
      flex-direction row
      justify-content center

      &_type .el-input input
         border-radius 15px 0 0 15px
         text-align center
         border-right 0

      &_direction input,
      &_date
         border-radius 0
         text-align center
         border-right 0
         width 220px !important

      &_submit
         display flex
         align-items center
         justify-content center
         width 160px !important
         border-radius 0 15px 15px 0 !important
         border 0
         background-color $main-color !important
         text-decoration none
         cursor pointer

         &:hover
            background-color $main-color-hover !important
         &:active
            background-color $main-color-active !important

   /* Переопределим стили компонентов */
   .el
      &-input.is-active .el-input__inner, .el-input__inner:focus,
      &-select .el-input.is-focus .el-input__inner,
      &-select .el-input__inner:focus,
      &-range-editor.is-active, .el-range-editor.is-active:hover
         border-width 1px
         border-color #ccc
         border-right 0
         outline none
</style>
