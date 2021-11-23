import {JSDOM} from 'jsdom';
import each from 'async/each';
import got from 'got';
import {DateTime} from 'luxon';
import Draft from 'App/Models/Draft';
import Tour from 'App/Models/Tour';
import BaseTour from './Tours/Base';
import {parseClubStrannik, parseDetailsStrannik} from './Tours/Strannik';
import {parseClubVpohod} from './Tours/Vpohod';
import {parseClubPerehod} from './Tours/Perehod';
import {parseClubPik} from './Tours/Pik';
import {parseClubMyway} from './Tours/Myway';

interface IReport {
    found: number;
    unique?: number;
    broken?: number
}

export default class Crawler {
    public clubs = {
        1: {
            id: 1,
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
            id: 2,
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
            id: 3,
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
            id: 4,
            tourClass: 'Pik',
            selector: '.columns.mb-6 .trip-card',
            links: [
                'https://turclub-pik.ru/search/?page=30&sorting=date&limit=20&routes_limit=20&regions=3,6,7,4,2,36,24,1,41,44',
            ],
        },
        5: {
            id: 5,
            tourClass: 'Myway',
            selector: '.alltravels .d-none .row .tour-line',
            links: [
                'https://mwtravel.ru/travel-all/',
            ]
        }
    };
    public tours: object[] = [];
    public report: IReport = {
        found: 0,
        unique: 0,
        broken: 0,
    };


    /**
     * Спарсим url, вернем dom, или набор данных
     */
    protected async getDataFromUrl(url: string, selector: string = 'body', isMultiple: boolean = false) {
        const response = await got(url);
        const document = new JSDOM(response.body).window.document;

        return isMultiple ? Array.from(document.querySelectorAll(selector)) : document.querySelector(selector);
    }

    protected parseClub(clubId: number, data: Element[]): BaseTour[] {
        switch (clubId) {
            case 1:
                return parseClubStrannik(data);
            case 2:
                return parseClubVpohod(data);
            case 3:
                return parseClubPerehod(data);
            case 4:
                return parseClubPik(data);
            case 5:
            default:
                return parseClubMyway(data);
        }
    }

    /**
     * Запрос на парсинг турклуба
     */
    async getClubTours({request}): Promise<{report: IReport, tours: any[]}> {
        let {club} = request.all();
        club = this.clubs[club];
        for (let url of club.links) {
            await this.parseTourDrafts(url, club.id, club.selector);
        }

        return {
            tours: this.tours,
            report: this.report,
        };
    }

    /**
     * Спарсить страницу со списком походов и запишем в черновики
     * @param {string} url – страница, с которой парсятся данные
     * @param {string} clubId – id турклуба
     * @param {string} blockSelector – селектор блоков похода
     */
    async parseTourDrafts(url: string, clubId: number, blockSelector: string) {
        const allNodes = await this.getDataFromUrl(url, blockSelector, true);

        const tours = this.parseClub(clubId, allNodes);

        await each(tours, async function(tour) {
            this.report.found++;
            this.report.broken += +tour.hasErrors();

            const equalDraft = await Draft.query()
               .where('title', tour.title)
               .where('date_from', '=', DateTime.fromISO(tour.date_from).toSQLDate())
               .where('date_to', '=', DateTime.fromISO(tour.date_to).toSQLDate())
               .first();

            if (!equalDraft?.id) {
                this.report.unique++;
                try {
                    const draft = await Draft.create(tour.getAllFields());
                    tour.id = draft.id;
                } catch (e) {
                    this.report.broken++;
                }
            } else {
                tour.id = equalDraft?.id;
            }

            this.tours.push(tour);
        }.bind(this));
    }

    async getTourDetails({request}) {
        const {tourInfo} = request.all();

        const draftId = tourInfo.id;
        delete tourInfo.id;

        const node = await this.getDataFromUrl(tourInfo.link);

        const fullTourData = parseDetailsStrannik(node, tourInfo);

        // @ts-ignore
        delete fullTourData.type;
        // @ts-ignore
        delete fullTourData.post;

        // @ts-ignore
        await Tour.create(fullTourData.getAllFields())
           .then((res) => {
               fullTourData.downloadCover(node, res.id)
               return res;
           })
           .then(res => {
               res.image = `${res.id}/cover.jpg`;
               res.save();
           });
        const draft = await Draft.findOrFail(draftId);
        draft.type = 'added';

        await draft.save()

        return draft;
    }
}
