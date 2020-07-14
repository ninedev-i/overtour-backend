import BaseTour from './Base';

export default class Myway extends BaseTour {
    constructor(document) {
        super();
        this.getTitle(document);
        this.getDate(document);
        this.getLink(document);
        // this.getPrice(document);
        // this.getImage(document);
        // this.getDescription(document);
        // this.getRegion(region);
        this.club = 5;
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
            const host = 'https://mwtravel.ru/';
            this.link = host + document.querySelector('.title').getAttribute('href');
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
