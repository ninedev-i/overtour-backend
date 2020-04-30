<template>
      <div class="filterSide-fixed">
         <div class="filterSide-container">
            <el-switch
               class="filterSide-item"
               v-model="view"
               inactive-text="Список"
               inactive-color="yellowgreen"
               active-color="yellowgreen"
               active-text="Плитка"
               @change="toggle()"
            />
         </div>

         <div class="filterSide-container">
            <!--<b>Продолжительность</b>
            <el-slider
               class="filterSide-item filterSide-slider"
               v-model="duration"
               :marks="durationMarks"
               :range="true"
               :min="1"
               :max="60"
            />-->

            <!--<div @click="request()">Найти</div>-->

            <b>Стоимость</b>
            <el-slider
               class="filterSide-item filterSide-slider"
               v-model="price"
               :range="true"
               :min="0"
               :max="100000"
               :step="500"
               :marks="priceMarks"
            />

            <!--<b>Набор</b><br />
            <el-checkbox
               class="filterSide-item"
               v-model="checked">Открыт</el-checkbox>
            <br />-->
            <b>Сложность</b><br />
            <!--<el-rate
               v-model="difficulty"
               :icon-classes="iconClasses"
               :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
            Турклуб-->
         </div>
      </div>

</template>

<script>
   import {Vue, Component, Prop} from 'vue-property-decorator';

   @Component
   export default class filterSide extends Vue {
      view = 'Список';
      duration = [1, 60];
      durationMarks = {
         // 1: '1 дн',
         // 60: '60 дн'
      };
      price = [0, 100000];
      priceMarks = {
         // 0: '0 руб'
      };
      difficulty = 1;
      checked = true;

      toggle() {
         this.$emit('changeview', {});
      }
   }
</script>

<style lang="less">
   @import '../../assets/constants';

   .filterSide {
      &-fixed {
         display: flex;
         position: fixed;
         flex-direction: column;
         width: inherit;
         height: auto;
      }

      &-container {
         padding: 12px;
         background-color: @page-background;
         margin-bottom: 12px;
      }

      &-item {
         margin-bottom: 12px;
      }

      &-slider {
         margin: 0 10px;
      }
   }

   // Перебьем стили кнопок
   .el {
      &-switch-label.is-active {
         color: @main-color !important;
      }
      &-checkbox__input {
         .is-checked {
            &+.el-checkbox__label {
               color: @main-color;
            }
            .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
               border-color: @main-color;
               background-color: @main-color;
            }
         }
         .is-focus .el-checkbox__inner {
            border-color: @main-color;
         }
      }
      &-slider {
         &__button {
            border-color: @main-color;
         }
         &__bar {
            background-color: @main-color;
         }
      }
   }
</style>
