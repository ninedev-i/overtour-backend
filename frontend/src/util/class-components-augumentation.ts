import { Component } from 'vue-property-decorator';
// Make asyncData augumentations
Component.registerHooks([
    'asyncData',
    'beforeRouteUpdate'
]);
