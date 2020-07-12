import BaseTour from './Base';

export default class Strannik extends BaseTour {
    constructor(document) {
        super();
        this.getTitle(document);
        this.getDate(document);
        this.getLink(document);
        // this.getPrice(document);
        // this.getImage(document);
        // this.getDescription(document);
        // this.getRegion(region);
        this.club = 1;
    }

    getTitle(document) {
        try {
            this.title = document.querySelector('.block_image span').textContent;
        } catch (e) {
            this.post.title = e.message;
            this.type = 'error';
        }
    }

    getDate(document) {
        try {
            let dates = document.querySelector('.date_value').textContent.trim();
            dates = dates.match(/(.*) - (.*)/i);
            const date_from = dates[1].match(/(.*)\.(.*)\/(.*)/i);
            const date_to = dates[2].match(/(.*)\.(.*)\/(.*)/i);
            this.date_from = `20${date_from[3]}-${date_from[2]}-${date_from[1]}T00:00:00Z`;
            this.date_to = `20${date_to[3]}-${date_to[2]}-${date_to[1]}T00:00:00Z`;
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
            const host = 'https://clubstrannik.ru';
            this.link = host + document.querySelector('a').getAttribute('href');
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
