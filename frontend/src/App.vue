<template>
   <div id="app">
      <transition name="fade" mode="out-in">
         <router-view></router-view>
      </transition>
   </div>
</template>

<style lang="stylus">
   @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
   @import '~element-ui/lib/theme-chalk/index.css';

   body
      padding 0
      margin 0
      font-family "Open Sans", sans-serif
      background-color #f9f9f9
   a
      color #34495e
      text-decoration none

   .fade-enter-active, .fade-leave-active
      transition all .2s ease
   .fade-enter, .fade-leave-active
      opacity 0
   *, *:before, *:after
      margin 0
   hr
      background-color #ececec
      height 1px
      border none
      margin 3px 0 2px
</style>
