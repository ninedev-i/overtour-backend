import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import {DateTime} from 'luxon';

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

    @column({})
    public club: number;

    @column.dateTime({autoCreate: true})
    public created_at: DateTime;

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updated_at: DateTime;
}
