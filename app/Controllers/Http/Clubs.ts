import {parseClubStrannik, parseDetailsStrannik} from 'App/Controllers/Http/Tours/Strannik';
import {parseClubVpohod} from 'App/Controllers/Http/Tours/Vpohod';
import {parseClubPerehod} from 'App/Controllers/Http/Tours/Perehod';
import {parseClubPik} from 'App/Controllers/Http/Tours/Pik';
import {parseClubMyway} from 'App/Controllers/Http/Tours/Myway';

export const clubs = {
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
      ],
      parse: parseClubStrannik,
      getDetails: parseDetailsStrannik,
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
      ],
      parse: parseClubVpohod,
      // TODO
      getDetails: parseDetailsStrannik,
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
      ],
      parse: parseClubPerehod,
      // TODO
      getDetails: parseDetailsStrannik,
   },
   4: {
      id: 4,
      tourClass: 'Pik',
      selector: '.columns.mb-6 .trip-card',
      links: [
         'https://turclub-pik.ru/search/?page=30&sorting=date&limit=20&routes_limit=20&regions=3,6,7,4,2,36,24,1,41,44',
      ],
      parse: parseClubPik,
      // TODO
      getDetails: parseDetailsStrannik,
   },
   5: {
      id: 5,
      tourClass: 'Myway',
      selector: '.alltravels .d-none .row .tour-line',
      links: [
         'https://mwtravel.ru/travel-all/',
      ],
      parse: parseClubMyway,
      // TODO
      getDetails: parseDetailsStrannik,
   }
};
