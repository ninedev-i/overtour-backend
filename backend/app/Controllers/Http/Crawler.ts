import {JSDOM} from 'jsdom';
import * as request from 'request-promise';
import {forEach} from 'async-foreach';
import {DateTime} from 'luxon';
import Draft from 'App/Models/Draft';
import BaseTour from './Tours/Base';
import Strannik from './Tours/Strannik';
import Vpohod from './Tours/Vpohod';
import Perehod from './Tours/Perehod';
import Pik from './Tours/Pik';
import Myway from './Tours/Myway';

export default class Crawler {
    protected clubs = {
        1: {
            tourClass: 'Strannik',
            selector: '.row .center_block .regions .card_item',
            links: [
                'http://clubstrannik.ru/kareliya',
                'http://clubstrannik.ru/altay',
                'https://clubstrannik.ru/tury-v-adygeyu',
                'https://clubstrannik.ru/baykal',
                'https://clubstrannik.ru/kavkaz',
                'https://clubstrannik.ru/kamchatka',
                'https://clubstrannik.ru/kareliya',
                'https://clubstrannik.ru/komandory',
                'https://clubstrannik.ru/krym',
                'https://clubstrannik.ru/voshozhdenie-na-elbrus',
            ]
        },
        2: {
           tourClass: 'Vpohod',
           selector: '.main_page .main_page_hikes_list article',
           links: [
              'https://www.vpoxod.ru/route/ingushetia?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/ug_rossii?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/central-region?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/ural?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/siberia?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/nw?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/nw?view=tiles&sort=date&per-page=96&page=2',
              'https://www.vpoxod.ru/route/sever?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/podmoskovje?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/krim_routes?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/kolskiy?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/karelia?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/karelia?view=tiles&sort=date&per-page=96&page=2',
              'https://www.vpoxod.ru/route/kamchatka?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/caucasus?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/caucasus?view=tiles&sort=date&per-page=96&page=2',
              'https://www.vpoxod.ru/route/dalniy_vostok?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/dagestan?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/elbrus?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/Bashkiria?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/baikal?view=tiles&sort=date&per-page=96',
              'https://www.vpoxod.ru/route/altai?view=tiles&sort=date&per-page=96',
           ]
        },
        3: {
           tourClass: 'Perehod',
           selector: '.b-schedule-table__border-line',
           links: [
              'https://club-perexod.ru/ajax/filter_shedule.php?r=34&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=33&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=196&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=394&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=373&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=388&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=258&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=403&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=391&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=404&all=1',
              'https://club-perexod.ru/ajax/filter_shedule.php?r=132&all=1',
           ]
        },
        4: {
           tourClass: 'Pik',
           selector: '',
           links: [
              'https://turclub-pik.ru/search_ajax/trips/?region-1=on',
              'https://turclub-pik.ru/search_ajax/trips/?region-2=on&page=1',
              'https://turclub-pik.ru/search_ajax/trips/?region-2=on&page=2',
              'https://turclub-pik.ru/search_ajax/trips/?region-2=on&page=3',
              'https://turclub-pik.ru/search_ajax/trips/?region-2=on&page=4',
              'https://turclub-pik.ru/search_ajax/trips/?region-3=on',
              'https://turclub-pik.ru/search_ajax/trips/?region-4=on',
              'https://turclub-pik.ru/search_ajax/trips/?region-6=on&page=1',
              'https://turclub-pik.ru/search_ajax/trips/?region-6=on&page=2',
              'https://turclub-pik.ru/search_ajax/trips/?region-7=on',
              'https://turclub-pik.ru/search_ajax/trips/?region-24=on',
              'https://turclub-pik.ru/search_ajax/trips/?region-36=on',
              'https://turclub-pik.ru/search_ajax/trips/?region-47=on',
              'https://turclub-pik.ru/search_ajax/trips/?region-41=on',
              'https://turclub-pik.ru/search_ajax/trips/?region-44=on',
           ],
           isApi: true
        },
        5: {
           tourClass: 'Myway',
           selector: '.alltravels .d-none .row .tour-line',
           links: [
              'https://mwtravel.ru/travel-all/',
           ]
        }
    };
    public tours: object[] = [];
    public report: {found: number, unique: number, broken: number} = {
        found: 0,
        unique: 0,
        broken: 0,
    };

    protected createClass(name: string, opts): BaseTour {
        switch (name) {
            case 'Strannik':
                return new Strannik(opts);
            case 'Vpohod':
                return new Vpohod(opts);
            case 'Perehod':
                return new Perehod(opts);
            case 'Pik':
                return new Pik(opts);
            default:
            case 'Myway':
                return new Myway(opts);
        }
    }

    /**
     * Запрос на парсинг турклуба
     */
    public async getClubTours({request}): Promise<{report: {found: number, unique?: number, broken?: number}, tours: object[]}> {
        let {club} = request.all();
        club = this.clubs[club];
        for (let url of club.links) {
            await this.parseUrl(url, club.tourClass, club.selector, club.isApi);
        }

        return {
            tours: this.tours,
            report: this.report,
        };
    }

    /**
     * Спарсить страницу со списком походов
     * @param {string} url – страница, с которой парсятся данные
     * @param {string} className – создаваемый класс
     * @param {string} blockSelector – селектор блоков похода
     * @param {boolean} isApi – является ли ссылка методом рест апи
     */
    async parseUrl(url: string, className: string, blockSelector: string, isApi: boolean = false) {
        const website = await request.get(url);
        let allNodes;
        if (isApi) {
            allNodes = JSON.parse(website);
        } else {
            const DOM = new JSDOM(website);
            const document = DOM.window.document;
            allNodes = document.querySelectorAll(blockSelector);
        }

        forEach(allNodes, async (node) => {
            const tour = this.createClass(className, node);
            this.tours.push(tour);

            this.report.found++;
            this.report.broken += +tour.hasErrors();

            const hasEqualRecord = await Draft.query()
                .where('title', tour.title)
                .where('date_from', '=', DateTime.fromISO(tour.date_from).toSQLDate())
                .where('date_to', '=', DateTime.fromISO(tour.date_to).toSQLDate())
                .count('*', 'total');

            if (!hasEqualRecord[0].total) {
                // TODO: разобраться почему теряется контекст
                // console.error(this.report.unique)
                this.report.unique++;
                await Draft.create(tour.getAllFields());
            }
        });
    }
}
