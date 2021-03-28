import Dish from 'App/Models/Dish';
import Ingredient from 'App/Models/Ingredient';
import each from 'async/each';

interface IIngredient {
    id: number;
    title: string;
    count: number;
}

export default class Dishes {
    public async getAll(): Promise<Dish[]> {
        const dishes = await Dish
            .query()
            .select('id', 'title', 'type', 'ingredients');

        await each(dishes, async (item) => {
            const ingredientsArray = Object.keys(JSON.parse(item.ingredients));
            let ingredients: IIngredient[] = []
            await each(ingredientsArray, async (id) => {
                let ingredient = await Ingredient
                    .query()
                    .select('id', 'title')
                    .where('id', +id)
                    .first();

                const ingredientData = {...ingredient!.toJSON(), ...{count: JSON.parse(item.ingredients)[id]}}

                ingredients.push(<IIngredient>ingredientData);
            });

            item.ingredients = ingredients
            return item;
        });

        return dishes;
    }

    public add({request}): Promise<Dish> {
        return Dish.create(request.all());
    }
}
