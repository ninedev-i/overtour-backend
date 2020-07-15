import BaseTour from './Base';
// import {Duration, Interval, DateTime} from 'luxon';

export default class Myway extends BaseTour {
    constructor(document: object, isDetailed: boolean = false) {
        super();
        this.club = 5;

        if (!document) {
            return
        }

        if (isDetailed) {
            this.getPrice(document);
            this.getImage(document);
            this.getDescription(document);
            this.getRegion(document);
        } else {
            this.getTitle(document);
            this.getDate(document);
            this.getLink(document);

            // FIXME: оно все равно не пишетася в базу, нужно подумать
            this.getDifficulty(document);
        }
    }

    getTitle(document) {
        try {
            this.title = document.querySelector('.dscr-wrapper .title').textContent.trim();
        } catch (e) {
            this.post.title = e.message;
            this.type = 'error';
        }
    }

    getDate(document) {
        try {
            const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
            let dates = document.querySelector('.dscr-wrapper .info-wrapper .col').textContent.trim();
            dates = dates.match(/(\d+)\s*(\W*)\s*(\d*) — (\d+) (\W*) (\d+)/i);

            let month_to: string | number = months.indexOf(dates[5].trim()) + 1;
            month_to = month_to < 10 ? `0${month_to}` : month_to;
            let day_to = dates[4] < 10 ? `0${dates[4]}` : dates[4];

            let year_from = dates[3] || dates[6];
            let month_from = dates[2] || dates[5];
            let day_from = dates[1] < 10 ? `0${dates[1]}` : dates[1];
            month_from = months.indexOf(month_from.trim()) + 1;
            month_from = month_from < 10 ? `0${month_from}` : month_from;
            this.date_from = `${year_from}-${month_from}-${day_from}T00:00:00Z`;
            this.date_to = `${dates[6]}-${month_to}-${day_to}T00:00:00Z`;
        } catch (e) {
            this.post.date_from = e.message;
            this.post.date_to = e.message;
            this.type = 'error';
        }
    }

    getLink(document) {
        try {
            const host = 'https://mwtravel.ru/';
            this.link = host + document.querySelector('.title').getAttribute('href');
        } catch (e) {
            this.post.link = e.message;
            this.type = 'error';
        }
    }

    getDifficulty(document) {
        try {
            switch (document.querySelector('.difficulty-link').id) {
                case 'easy':
                    this.difficulty = 1;
                    break;
                case 'complicated':
                    this.difficulty = 2;
                    break;
                case 'normal':
                    this.difficulty = 3;
                    break;
                case 'hard':
                    this.difficulty = 4;
                    break;
                case 'very_hard':
                    this.difficulty = 4;
                    break;
            }
        } catch (e) {
            this.post.link = e.message;
            this.type = 'error';
        }
    }


    //  Далее методы для получения более подробной информации

    getRegion(document) {
        try {
            const crumbs = document.querySelectorAll('.breadcrumbs a')
            this.region = crumbs[crumbs.length - 1].textContent;
        } catch (e) {
            this.post.region = e.message;
        }
    }

    getPrice(document) {
        try {
            const price = document.querySelector('#tour_payment strong').textContent;
            this.price = +price.replace(/[\s, \W]/g, '');
        } catch (e) {
            this.post.price = e.message;
            this.type = 'error';
        }
    }

    getImage(document) {
        try {
            let image = document.querySelector('.header-image').style.backgroundImage;
            image = image.replace(/url\(/g, '').replace(/\)/g, '')
            this.image = image;
        } catch (e) {
            this.post.image = e.message;
            this.type = 'error';
        }
    }

    getDescription(document) {
        try {
            let description = document.querySelector('#tour_about').textContent.trim();
            description = description.replace('/\n/g',' ');
            this.description = description;
        } catch (e) {
            this.post.description = e.message;
            this.type = 'error';
        }
    }
}
