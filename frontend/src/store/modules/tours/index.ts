import {Module} from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import {State} from '../../types';
import {ToutsState} from './types';

const state: ToutsState =  {
    tours: [],
    filter: {
        tags: '',
        date_from: '',
        date_to: '',
        region: '',
    },
};

const namespaced: boolean = true;

export default <Module<ToutsState, State>> {
    namespaced,
    state,
    getters,
    actions,
    mutations
};