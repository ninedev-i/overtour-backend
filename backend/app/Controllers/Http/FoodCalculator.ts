import Dish from 'App/Models/Dish';
import Ingredient from 'App/Models/Ingredient';
import {ModelQueryBuilderContract} from '@ioc:Adonis/Lucid/Model';
// import each from 'async/each';

// interface IIngredient {
//     id: number;
//     title: string;
//     count: number;
// }

export default class FoodCalculator {
    // Dishes
    public async dishList(): Promise<Dish[]> {
        // const dishes = await Dish
        //     .query()
        //     .select('id', 'title', 'type', 'ingredients');
        //
        // await each(dishes, async (item) => {
        //     const ingredientsArray = Object.keys(JSON.parse(item.ingredients));
        //     let ingredients: IIngredient[] = []
        //     await each(ingredientsArray, async (id) => {
        //         let ingredient = await Ingredient
        //             .query()
        //             .select('id', 'title')
        //             .where('id', +id)
        //             .first();
        //
        //         const ingredientData = {...ingredient!.toJSON(), ...{count: JSON.parse(item.ingredients)[id]}}
        //
        //         ingredients.push(<IIngredient>ingredientData);
        //     });
        //
        //     item.ingredients = ingredients
        //     return item;
        // });

        return Dish
            .query()
            .select('id', 'title', 'type', 'ingredients');
    }

    public addDish({request}): Promise<Dish> {
        return Dish.create(request.all());
    }

    public editDish({request, params}): ModelQueryBuilderContract<typeof Dish, number> {
        return Dish
            .query()
            .where('id', params.id)
            .update(request.all());
    }

    // Ingredients
    public async ingredientsList(): Promise<Ingredient[]> {
        return Ingredient.query().select('id', 'title', 'type');
    }

    public addIngredient({request}): Promise<Ingredient> {
        return Ingredient.create(request.all());
    }

    public editIngredient({request, params}): ModelQueryBuilderContract<typeof Ingredient, number> {
        return Ingredient
            .query()
            .where('id', params.id)
            .update(request.all());
    }
}
