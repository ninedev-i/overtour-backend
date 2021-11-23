import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Tour from 'App/Models/Tour';
import Draft from 'App/Models/Draft';
import dayjs from 'dayjs';
import { LucidRow } from '@ioc:Adonis/Lucid/Model';

export default class Tours {
   // Список походов по фильтру
   public getTours({ request }: HttpContextContract) {
      const { region, date_from, date_to, tags } = request.all();
      let tour = Tour
         .query()
         .select('id', 'title', 'date_from', 'date_to', 'duration', 'image', 'description', 'price', 'link',
            'difficulty', 'region', 'tags');

      if (date_from && date_to) {
         const filterDate = date_from ? date_from : dayjs(new Date()).format('YYYY-MM-DD');
         tour = tour
            .where('date_from', '>=', filterDate)
            .where('date_from', '<=', date_to)
      } else {
         tour = tour
            .where('date_from', '>=', dayjs(new Date()).format('YYYY-MM-DD'))
         console.error(dayjs(new Date()).format('YYYY-MM-DD'))
      }

      if (region) {
         tour = tour.where('region', '=', region);
      }

      if (tags) {
         tour = tour.where('tags', 'like', `%${tags}%`)
      }

      return tour
         .orderBy('date_from')
         .limit(40);
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
