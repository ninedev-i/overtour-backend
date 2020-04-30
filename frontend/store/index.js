// TODO: Перевести на TS
export const state = () => ({
   events: [],
   eventsFilter: {
      date_from: '',
      date_to: '',
      region: '',
      tags: ''
   }
});

export const actions = {
   async getEvents({commit}) {
      try {
         const result = await this.$axios.post(`get_tours`, this.state.eventsFilter);
         commit('setEvents', result.data);
      } catch (e) {}
   },

   async getEventsFilter({commit}) {
      const filter = await this.$cookies.get('eventsFilter') || {};
      commit('setEventsFilter', filter);
   },
};

export const mutations = {
   setEventsFilter(state, filter) {
      state.eventsFilter = filter;
      this.$cookies.set('eventsFilter', filter, {path: '/', maxAge: 60 * 60 * 24 * 7});
   },

   setEventsDate(state, [date_from, date_to]) {
      state.eventsFilter.date_from = date_from;
      state.eventsFilter.date_to = date_to;
   },

   setEventsRegion(state, region) {
      state.eventsFilter.region = region;
   },

   setEventsTags(state, tags) {
      state.eventsFilter.tags = tags;
   },

   setEvents(state, data) {
      state.events = data;
   },
};
