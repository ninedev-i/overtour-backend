import {DateTime} from 'luxon';
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
// import moment from 'moment';

export default class Tour extends BaseModel {
   @column({isPrimary: true})
   public id: number;

   @column({})
   public title: string;

   @column.date()
   public date_from: DateTime;

   @column.date()
   public date_to: DateTime;

   @column({})
   public description: string;

   @column({})
   public link: string;

   @column({})
   public image: string;

   @column({})
   public price: number;

   @column({})
   public duration: string;

   @column({})
   public difficulty: number;

   @column({})
   public region: string;

   @column({})
   public tags: string;

   @column.dateTime({autoCreate: true})
   public created_at: DateTime;

   @column.dateTime({autoCreate: true, autoUpdate: true})
   public updated_at: DateTime;

   //
   // static scopeRegion(builder, region) {
   //    if (region) {
   //       builder.where('region', region)
   //    }
   // }
   //
   // static scopeFromDate(builder, date_from) {
   //    const filterDate = date_from ? date_from : moment().format('YYYY-MM-DD');
   //    builder.where('date_from', '>=', filterDate)
   // }
   //
   // static scopeToDate(builder, date_to) {
   //    if (date_to) {
   //       builder.where('date_from', '<=', date_to)
   //    }
   // }
   //
   // static scopeTags(builder, tags) {
   //    if (tags) {
   //       builder.where('tags', 'like', `%${tags}%`)
   //    }
   // }
}
