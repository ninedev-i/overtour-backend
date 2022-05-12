import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';
import { JSDOM } from 'jsdom';
import each from 'async/each';
import got from 'got';
import { DateTime } from 'luxon';
import Draft from 'App/Models/Draft';
import Tour from 'App/Models/Tour';
import BaseTour from './Tours/Base';
import { clubs } from 'App/Controllers/Http/Clubs';

interface Report {
   found: number;
   unique?: number;
   broken?: number
}

export default class Crawler {
   public tours: BaseTour[] = [];
   public report: Report = {
      found: 0,
      unique: 0,
      broken: 0,
   };

   /**
     * Спарсим url, вернем dom, или набор данных
     */
   protected async getDataFromUrl<T>(url: string, selector: string = 'body', isMultiple: boolean = false): Promise<T> {
      const response = await got(url);
      const document = new JSDOM(response.body).window.document;

      return isMultiple ? Array.from(document.querySelectorAll(selector)) : document.querySelector(selector);
   }

   /**
     * Запрос на парсинг турклуба
     */
   public async getClubTours({ request }: HttpContextContract): Promise<{report: Report, tours: BaseTour[]}> {
      let { club } = request.all();
      club = clubs[club];
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
   public async parseTourDrafts(url: string, clubId: number, blockSelector: string): Promise<void> {
      const allNodes = await this.getDataFromUrl<Element[]>(url, blockSelector, true);

      const tours = clubs[clubId].parse(allNodes);

      await each(tours, async function(tour: BaseTour) {
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
               const draft = await Draft.create(tour.getDraftFields());
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

   public async getTourDetails({ request }: HttpContextContract): Promise<Draft> {
      const { tourInfo } = request.all();
      return this.parseDetailed(tourInfo);
   }

   public async parseDetailed(tourInfo: ModelObject): Promise<Draft> {
      const draftId = tourInfo.id;
      delete tourInfo.id;

      const node = await this.getDataFromUrl<Element>(tourInfo.link);

      const fullTourData = clubs[tourInfo.club].getDetails(node, tourInfo);

      delete fullTourData.type;
      delete fullTourData.post;

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

   /*
    * Парсим детально набор походов
    */
   public async getDetailsByClub({ request }: HttpContextContract): Promise<void> {
      const { clubId } = request.all();

      const drafts = await Draft.query()
         .where('club', clubId)
         .where('type', 'draft')
         .orderBy('date_from', 'asc')
         .limit(40);

      return drafts.forEach(draft => {
         this.parseDetailed(draft.toJSON());
      });
   }
}
