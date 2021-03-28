import Dish from 'App/Models/Dish';
// import Ingredient from 'App/Models/Ingredient';

export default class Attachments {
    public async getAll() {
        const dishes = await Dish
            .query()
            // .preload('ingredient', (query) => query.select('name', 'avatar'))
            .preload('ingredient')
            // .preload('ingredient', (query) => {query.serialize()})

        dishes.map(item => {
            return item.ingredient = 'asdasd';
        })
        // .preload('ingredient');

        // dishes.forEach((item) => {
        //     console.log(item)
        // })

        return dishes;
    }

    public addDish({request}) {
        // console.log(request.all())
        return Dish.create(request.all());
    }
}
