import Vue from 'vue';
import Vuex from 'vuex';
import tours from './modules/tours/index';
import {State} from './types';
import {Store} from 'vuex';

Vue.use(Vuex);

export function createStore (): Store<State> {
    return new Vuex.Store({
        modules: {
            tours,
        }
    });
}
