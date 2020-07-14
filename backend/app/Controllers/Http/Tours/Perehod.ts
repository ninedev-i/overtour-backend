import BaseTour from './Base';

export default class Perehod extends BaseTour {
    constructor(document) {
        super();
        this.getTitle(document);
        this.getDate(document);
        this.getLink(document);
        // this.getPrice(document);
        // this.getImage(document);
        // this.getDescription(document);
        // this.getRegion(region);
        this.club = 3;
    }

    getTitle(document) {
        try {
            this.title = document.querySelector('.b-schedule-table__name a').textContent;
        } catch (e) {
            this.post.title = e.message;
            this.type = 'error';
        }
    }

    getDate(document) {
        try {
            const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
            let dates = document.querySelector('.b-schedule-table__date').textContent.trim();
            dates = dates.match(/(\d+)\s(\W+)\s(\d+)\s+\-\s+(\d+)\s(\W+)\s(\d+)/i);
            let month_from: string | number = months.indexOf(dates[2]) + 1;
            month_from = month_from < 10 ? `0${month_from}` : month_from;
            let month_to: string | number = months.indexOf(dates[5]) + 1;
            month_to = month_to < 10 ? `0${month_to}` : month_to;
            this.date_from = `${dates[3]}-${month_from}-${dates[1]}T00:00:00Z`;
            this.date_to = `${dates[6]}-${month_to}-${dates[4]}T00:00:00Z`;
        } catch (e) {
            this.post.date_from = e.message;
            this.post.date_to = e.message;
            this.type = 'error';
        }
    }

    getPrice(document) {
        try {
            const price = document.querySelector('.price .number').textContent;
            this.price = +price.replace(/[\s, \W]/g, '');
        } catch (e) {
            this.post.price = e.message;
            this.type = 'error';
        }
    }

    getImage(document) {
        try {
            this.image = document.querySelector('.block_image img').getAttribute('src');
        } catch (e) {
            this.post.image = e.message;
            this.type = 'error';
        }
    }

    getLink(document) {
        try {
            const host = 'https://club-perexod.ru';
            this.link = host + document.querySelector('.b-schedule-table__name a').getAttribute('href');
        } catch (e) {
            this.post.link = e.message;
            this.type = 'error';
        }
    }

    getDescription(document) {
        try {
            let description = document.querySelector('.description').textContent.trim();
            description = description.replace('/\n/g',' ');
            this.description = description;
        } catch (e) {
            this.post.description = e.message;
            this.type = 'error';
        }
    }

    // getRegion(document) {
    //    try {
    //       this.region = region;
    //    } catch (e) {
    //       this.post.region = e.message;
    //    }
    // }
}
