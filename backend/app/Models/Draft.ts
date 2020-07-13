import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import {DateTime} from 'luxon';

export default class Draft extends BaseModel {
    @column({isPrimary: true})
    public id: number;

    @column({})
    public title: string;

    @column.date()
    public date_from: DateTime;

    @column.date()
    public date_to: DateTime;

    @column({})
    public club: number;

    @column({})
    public link: string;

    @column({})
    public type: string;

    @column.dateTime({autoCreate: true})
    public created_at: DateTime;

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updated_at: DateTime;
}
