import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Dish extends BaseModel {
   @column({ isPrimary: true })
   public id: number;

   @column({})
   public title: string;

   @column({})
   public type: number;

   @column({
      serialize: (value) => JSON.parse(value),
   })
   public ingredients: object[];

   @column({})
   public user_id: number;

   @computed()
   public get is_default() {
      return this.user_id === 1;
   }

   @column.dateTime({ autoCreate: true })
   public created_at: DateTime;

   @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime;
}
