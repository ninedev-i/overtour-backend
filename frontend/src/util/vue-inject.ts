import Vue from 'vue';
import {dayjs} from './dayjs';

// element
import ElementUI from 'element-ui';
// @ts-ignore
import locale from 'element-ui/lib/locale/lang/ru-RU';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { locale });

/**
 * разбиение сумм на триады
 * @param {string|number} sum
 * @returns {string}
 */
Vue.prototype.triads = (sum: number) => {
    const output = sum + '';
    return output.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

/**
 * разбиение сумм на триады
 * @param {string|Date} date_from_string – дата начала
 * @param {string|Date} date_to_string – дата окончалния
 * @returns {string}
 */
Vue.prototype.period = (date_from_string: string, date_to_string: string) => {
    const date_from = new Date(date_from_string);
    const date_to = new Date(date_to_string);
    const currentYear = new Date().getFullYear();
    const yearsEqualCurrent = currentYear === date_from.getFullYear() && currentYear === date_to.getFullYear();
    const yearFormat = yearsEqualCurrent ? '' : 'YYYY';
    let output;

    if (date_from_string === date_to_string) {
        output = dayjs(date_to).format(`D MMMM ${yearFormat}`);
    } else if (date_from.getFullYear() === date_to.getFullYear()) {
        if (date_from.getMonth() === date_to.getMonth()) {
            output = `${dayjs(date_from).format('D')}—${dayjs(date_to).format(`D MMM ${yearFormat}`)}`;
        } else {
            output = `${dayjs(date_from).format('D MMM')}—${dayjs(date_to).format(`D MMM ${yearFormat}`)}`;
        }
    } else  {
        output = `${dayjs(date_from).format(`D MMM ${yearFormat}`)}—${dayjs(date_to).format(`D MMM ${yearFormat}`)}`;
    }

    return output;
};
