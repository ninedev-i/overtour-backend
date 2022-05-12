import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Ingredient extends BaseModel {
   @column({ isPrimary: true })
   public id: number;

   @column({})
   public title: string;

   @column({})
   public type: number;

   @column({})
   public count_caption: string;

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
