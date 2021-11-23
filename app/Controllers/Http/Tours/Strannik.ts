import BaseTour from './Base';
import {parseDates} from '../../Helpers/Parse';
import {downloadImage} from 'App/Controllers/Helpers/ImageDonwload';

interface IInitData {
    date_from: string;
    date_to: string;
}

interface IStrannikConstructorData {
    document: Element;
    initData: IInitData
}

export function parseClubStrannik(nodes: Element[]): BaseTour[] {
    let output: IStrannikConstructorData[] = [];

    nodes.forEach((document) => {
        Array
            .from(document.querySelectorAll('.list_season_block .period'))
            .forEach((item: Element) => {
                const [date_from, date_to] = parseDates(item.textContent);
                output.push({
                    document,
                    initData: {date_from, date_to}
                });
            })
    });

    return output.map((tour) => new Strannik(tour));
}

export function parseDetailsStrannik(document: Element, initData: any): Strannik {
    return new Strannik({document, initData}, true);
}

export default class Strannik extends BaseTour {
    constructor({document, initData}: IStrannikConstructorData, isDetailed?: boolean) {
        super();

        if (isDetailed) {
            for (let field in initData) {
                this[field] = initData[field];
            }
            this.getPrice(document);
            this.getDescription(document);
            this.getRegion(document);
            this.getDifficulty(document);
        } else {
            this.club = 1;
            const {date_from, date_to} = initData;

            this.getTitle(document);
            this.getDate([date_from, date_to]);
            this.getLink(document);
        }
    }

    getTitle(document) {
        try {
            this.title = document.querySelector('.block_image span').textContent;
        } catch (e) {
            this.post.title = e.message;
            this.type = 'error';
        }
    }

    getDate([date_from, date_to]) {
        this.date_from = date_from;
        this.date_to = date_to;
    }

    getPrice(document) {
        try {
            const price = document.querySelector('.price_desktop_spec').textContent;
            this.price = +price.replace(/[\s, \W]/g, '');
        } catch (e) {
            this.post.price = e.message;
            this.type = 'error';
        }
    }

    downloadCover(document, id) {
        const imageUrl = document.querySelector('.block_slider img').getAttribute('src');
        return downloadImage(imageUrl, id);
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
            let description = document.querySelector('.comment-text').textContent.trim();
            description = description.replace('/\n/g',' ');
            this.description = description;
        } catch (e) {
            this.post.description = e.message;
            this.type = 'error';
        }
    }

    getRegion(document) {
       try {
          this.region = document.querySelector('.white_text.block_link').children[1].querySelector('a').textContent;
       } catch (e) {
          this.post.region = e.message;
       }
    }

    getDifficulty(document) {
       try {
          this.difficulty = +document.querySelector('.tour_params .value').textContent.split('/')[0];
       } catch (e) {
          this.post.difficulty = e.message;
       }
    }
}
