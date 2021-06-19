import Dish from 'App/Models/Dish';
import Menu from 'App/Models/Menu';
import Ingredient from 'App/Models/Ingredient';
import {ModelQueryBuilderContract} from '@ioc:Adonis/Lucid/Model';
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';
import {AuthContract} from '@ioc:Adonis/Addons/Auth';

export default class FoodCalculator {
    // Dishes
    public async dishList({auth}: HttpContextContract): Promise<Dish[]> {
        const userIdArray = await this._getUserArray(auth);
        return Dish
            .query()
            .select('id', 'title', 'type', 'ingredients')
            .whereIn('user_id', userIdArray)
            .orderBy('title');
    }

    public async addDish(context: HttpContextContract): Promise<Dish[]> {
        const {auth, request} = context;
        const data = {...request.all(), ...{user_id: auth.user!.id}};
        await Dish.create(data);
        return this.dishList(context);
    }

    public editDish({request, params}: HttpContextContract): ModelQueryBuilderContract<typeof Dish, number> {
        return Dish
            .query()
            .where('id', params.id)
            .update(request.all());
    }

    // Ingredients
    public async ingredientsList({auth}: HttpContextContract): Promise<Ingredient[]> {
        const userIdArray = await this._getUserArray(auth);
        return Ingredient.query()
            .select('id', 'title', 'type', 'count_caption')
            .whereIn('user_id', userIdArray)
            .orderBy('title');
    }

    public async addIngredient(context: HttpContextContract): Promise<Ingredient[]> {
        const {auth, request} = context;
        const data = {...request.all(), ...{user_id: auth.user!.id}};
        await Ingredient.create(data);
        return this.ingredientsList(context);
    }

    public async editIngredient(context: HttpContextContract):  Promise<Ingredient[]> {
        const {params, request} = context;
        await Ingredient
            .query()
            .where('id', params.id)
            .update(request.all());

        return this.ingredientsList(context);
    }

    protected async _getUserArray(auth: AuthContract): Promise<number[]> {
        await auth.check()
        const userId = auth.user?.id;
        return userId && userId !== 1 ? [1, userId] : [1];
    }

    // Menus
    public async menuList({auth}: HttpContextContract): Promise<Menu[]> {
        try {
            await auth.check()
            const userId = auth.user!.id;

            return Menu.query()
                .select('id', 'title', 'content', 'settings', 'updated_at')
                .where('user_id', userId)
                .orderBy('title');
        } catch {
            return [];
        }
    }

    public async addMenu(context: HttpContextContract): Promise<Menu[]> {
        const {auth, request} = context;
        const data = {...request.all(), ...{user_id: auth.user!.id}};
        await Menu.create(data);
        return this.menuList(context);
    }

    public async updateMenu(context: HttpContextContract):  Promise<Menu[]> {
        const {params, request} = context;
        await Menu
            .query()
            .where('id', params.id)
            .update(request.all());

        return this.menuList(context);
    }

}
