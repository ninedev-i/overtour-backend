import {Axios} from '../../../util/axios';
import {ActionTree} from 'vuex';
import {ToutsState} from './types';
import {Notification} from 'element-ui';

export default <ActionTree<ToutsState, any>> {
    getTours({commit}, filter): Promise<any> {
        return Axios
            .get('get_tours', {params: filter})
            .then(({data}) => {
                commit('setTours', data);
            }, (error) => {
                Notification.error({
                    title: 'Ошибка',
                    message: 'Не удалось загрузить походы',
                    position: 'bottom-right'
                })
                console.log(error);
            });
    },

    async getEventsFilter(/*{commit}*/) {
        // const filter = await this.$cookies.get('eventsFilter') || {};
        // commit('setEventsFilter', filter);
    },
};