import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import {DateTime} from 'luxon';

export default class Menu extends BaseModel {
    @column({isPrimary: true})
    public id: number;

    @column({})
    public title: string;

    @column({})
    public user_id: number;

    @column({
        serialize: (value) => JSON.parse(value),
    })
    public content: object[];

    @column({
        serialize: (value) => JSON.parse(value),
    })
    public settings: object;

    @column({
        serialize: (value) => !!value,
    })
    public is_current: boolean;

    @column.dateTime({autoCreate: true})
    public created_at: DateTime;

    @column.dateTime({autoCreate: true, autoUpdate: false})
    public updated_at: DateTime;
}
