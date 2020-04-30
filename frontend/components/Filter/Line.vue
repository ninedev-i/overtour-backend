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

      <el-autocomplete
         class="filterLine_direction"
         v-model="region"
         :fetch-suggestions="querySearch"
         placeholder="Место"
      />

      <el-date-picker
         class="filterLine_date"
         v-model="dateValue"
         type="daterange"
         start-placeholder="Туда"
         end-placeholder="Обратно"
         format="d.MM.yyyy"
         value-format="yyyy-MM-dd"
         range-separator="–"
         :picker-options="datePickerOptions"
      />

      <el-button type="success" icon="el-icon-search" class="filterLine_submit" @click="searchEvents">Найти</el-button>
   </div>
</template>

<script>
   import {Vue, Component} from 'vue-property-decorator';

   @Component({
      async mounted() {
         this.regions = await this.$axios
            .get(`get_regions`)
            .then(res => res.data)
            .catch(err => {
               console.error('Не удалось получить Регионы');
               return [];
            });
      }
   })
   export default class FilterLine extends Vue {
      now = new Date();
      date_from = null;
      date_to = null;
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
      regions = [];
      tags = '';

      searchEvents() {
         this.$store.commit('setEventsFilter', {date_from: this.dateValue[0], date_to: this.dateValue[1], region: this.region, tags: this.tags});
         if (this.$attrs.withRequests) {
            return this.$store.dispatch('getEvents', {});
         } else {
            this.$router.push({path: `/tours`});
         }
      }

      querySearch(searchString, cb) {
         const results = searchString ? this.regions.filter(this.filterRegions(searchString)) : this.regions;
         cb(results);
      }

      filterRegions(queryString) {
         return link => {
            return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
         };
      }

      get region() {
         return this.$store.state.eventsFilter.region;
      }
      set region(value) {
         this.$store.commit('setEventsRegion', value || '');
      }

      get dateValue() {
         const {date_from, date_to} = this.$store.state.eventsFilter;
         return [date_from, date_to];
      }
      set dateValue(value) {
         this.$store.commit('setEventsDate', value || ['', '']);
      }

      get tags() {
         return this.$store.state.eventsFilter.tags;
      }

      set tags(value) {
         this.$store.commit('setEventsTags', value || '');
      }
   }
</script>

<style lang="less">
   @import '../../assets/constants';

   .filterLine {
      display: flex;
      flex-direction: row;
      justify-content: center;

      &_type .el-input input {
         border-radius: 15px 0 0 15px;
         text-align: center;
         border-right: 0;
      }

      &_direction input,
      &_date {
         border-radius: 0;
         text-align: center;

         border-right: 0;
      }

      &_submit {
         display: flex;
         align-items: center;
         justify-content: center;
         width: 160px !important;
         border-radius: 0 15px 15px 0 !important;
         border: 0;
         background-color: @main-color !important;
         text-decoration: none;
         cursor: pointer;

         &:hover {
            background-color: @main-color-hover !important;
         }
         &:active {
            background-color: @main-color-active !important;
         }
      }
   }

   /* Переопределим стили компонентов */
   .el {
      &-input.is-active .el-input__inner, .el-input__inner:focus,
      &-select .el-input.is-focus .el-input__inner,
      &-select .el-input__inner:focus,
      &-range-editor.is-active, .el-range-editor.is-active:hover{
         border-width: 1px;
         border-color: #ccc;
         border-right: 0;
         outline: none;
      }
   }
</style>

