import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import {DateTime} from 'luxon';

export default class Dish extends BaseModel {
    @column({isPrimary: true})
    public id: number;

    @column({})
    public title: string;

    @column({})
    public type: number;

    @column({
        // consume: async (value: string) => await Ingredient.query().where('id', 0).first()

        // serialize: (async value => {
        //     console.log(value)
        //     return await Ingredient.query().where('id', 0).first()
        // })
    })
    public ingredients: object[];

    @column.dateTime({autoCreate: true})
    public created_at: DateTime;

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updated_at: DateTime;


    // @hasMany(() => Ingredient, {
    //     foreignKey: 'id'
    // })
    // public ingredient: HasMany<typeof Ingredient>

    @column()
    public ingredient: string;
    // @hasMany(() => Ingredient, {
    //     foreignKey: 'id',
    // })
    // public ingredient: Ingredient<typeof Ingredient>

    // @belongsTo(() => Ingredient)
    // public ingredient: BelongsTo<typeof Ingredient>
}
