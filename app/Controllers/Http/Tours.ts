import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Tour from 'App/Models/Tour';
import Draft from 'App/Models/Draft';
import { DateTime } from 'luxon';
import { LucidRow } from '@ioc:Adonis/Lucid/Orm';

export default class Tours {
   // Список походов по фильтру
   public getTours({ request }: HttpContextContract) {
      const { region, date_from, date_to, tags, price, duration, page } = request.all();

      let tour = Tour
         .query()
         .select('id', 'title', 'date_from', 'date_to', 'duration', 'image', 'description', 'price', 'link',
            'difficulty', 'region', 'tags');

      if (date_from && date_to) {
         const filterDate = date_from ? date_from : DateTime.fromJSDate(new Date()).toSQLDate();
         tour = tour
            .where('date_from', '>=', filterDate)
            .where('date_from', '<=', date_to)
      } else {
         tour = tour
            .where('date_from', '>=', DateTime.fromJSDate(new Date()).toSQLDate())
      }

      if (region) {
         tour = tour.where('region', '=', region);
      }

      if (tags) {
         tour = tour.where('tags', 'like', `%${tags}%`)
      }

      if (price) {
         const [priceFrom, priceTo] = JSON.parse(price);
         tour = tour
            .where('price', '>=', priceFrom)
            .where('price', '<=', priceTo)
      }

      if (duration) {
         const [durationFrom, durationTo] = JSON.parse(duration);
         tour = tour
            .where('duration', '>=', durationFrom)
            .where('duration', '<=', durationTo)
      }

      return tour
         .orderBy('date_from')
         .paginate(page ?? 1, 40);
   }

   // Данные о походе
   public async getTour({ params }): Promise<LucidRow | null> {
      const id = params.id;
      return await Tour
         .query()
         .select('id', 'title', 'date_from', 'date_to', 'duration', 'image', 'description', 'price', 'link',
            'difficulty', 'region', 'tags')
         .where('id', id)
         .first();
   }

   // Список регионов
   public async getRegions(): Promise<{ value: string }[]> {
      const regions = await Tour
         .query()
         .distinct('region')
         .orderBy('region');

      return regions.map(direction => {
         return { value: direction.region };
      });
   }

   public async getAllDrafts() {
      return Draft.query().orderBy('date_from', 'desc');
   }
}
