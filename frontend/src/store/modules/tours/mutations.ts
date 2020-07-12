import {MutationTree} from 'vuex';
import {ToutsState} from './types';

export default <MutationTree<ToutsState>> {
    setFilter(state, filter = '') {
        state.filter = filter;
        // this.$cookies.set('eventsFilter', filter, {path: '/', maxAge: 60 * 60 * 24 * 7});
    },

    setFilterTags(state, tags = '') {
        state.filter.tags = tags;
    },

    setFilterRegion(state, region = '') {
        state.filter.region = region;
    },

    setFilterDate(state, [date_from, date_to]) {
        state.filter.date_from = date_from;
        state.filter.date_to = date_to;
    },

    setTours(state, data) {
        state.tours = data;
    },
};
