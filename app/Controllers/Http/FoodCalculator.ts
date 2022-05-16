import Dish from 'App/Models/Dish';
import Menu from 'App/Models/Menu';
import Ingredient from 'App/Models/Ingredient';
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';

export default class FoodCalculator {
   // Dishes
   public async dishList({ auth }: HttpContextContract): Promise<Dish[]> {
      const userIdArray = await this._getUserArray(auth);
      return Dish
         .query()
         .select('id', 'title', 'type', 'ingredients', 'user_id')
         .whereIn('user_id', userIdArray)
         .orderBy('title', 'asc');
   }

   public async addDish(context: HttpContextContract): Promise<Dish[]> {
      const { auth, request } = context;
      const data = { ...request.all(), ...{ user_id: auth.user!.id } };
      await Dish.create(data);
      return this.dishList(context);
   }

   public editDish({ request, params }: HttpContextContract): ModelQueryBuilderContract<typeof Dish, number> {
      return Dish
         .query()
         .where('id', params.id)
         .update(request.all());
   }

   public async deleteDish(context: HttpContextContract): Promise<{ current?: string, dishList: Dish[] }> {
      const { auth, params, request } = context;
      const currentTimetable = request.all().current;
      const output = {
         current: null,
         dishList: [],
      };
      let isCurrentChanged = false;
      const updatedCurrentMenu = currentTimetable.map((content) => {
         content.dishes = content.meals.map((dish) => {
            dish.menu = dish.menu.filter((dishMenu) => {
               if (dishMenu.id === +params.id) {
                  isCurrentChanged = true;
                  return;
               }
               return dishMenu;
            });
            return dish;
         });
         return content;
      });

      if (isCurrentChanged) {
         output.current = updatedCurrentMenu;
      }

      await Dish
         .query()
         .where('id', params.id)
         .where('user_id', auth.user!.id)
         .delete();

      output.dishList = await this.dishList(context);

      const menus = await Menu.query().where('user_id', auth.user!.id);
      menus.forEach((menu) => {
         let isMenuChanged = false;
         const updatedMenu = JSON.parse(menu.content).map((content) => {
            content.meals.map((dish) => {
               dish.menu = dish.menu.filter((dishMenu) => {
                  if (dishMenu.id === +params.id) {
                     isMenuChanged = true;
                     return;
                  }
                  return dishMenu;
               });
               return dish;
            });
            return content
         })

         if (isMenuChanged) {
            menu.content = JSON.stringify(updatedMenu);
            menu.save();
         }
      });

      return output;
   }

   public async checkIsDishUsed({ auth, params, request }: HttpContextContract): Promise<string[]> {
      const menus = await Menu.query().where('user_id', auth.user!.id);
      const currentTimetable = JSON.parse(request.all().current);
      let usedInMenus = new Set<string>();

      const checkDishes = (timetables, menuTitle: string) => {
         timetables.forEach((content) => {
            content.meals.forEach((dish) => {
               dish.menu.forEach((dishMenu) => {
                  if (dishMenu.id === +params.id) {
                     usedInMenus.add(menuTitle);
                  }
               });
            });
         });
      };
      checkDishes(currentTimetable, 'current');

      menus.forEach((menu) => {
         checkDishes(JSON.parse(menu.content), menu.title);
      });

      return Array.from(usedInMenus);
   }

   // Ingredients
   public async ingredientsList({ auth }: HttpContextContract): Promise<Ingredient[]> {
      const userIdArray = await this._getUserArray(auth);
      return Ingredient.query()
         .select('id', 'title', 'type', 'count_caption', 'user_id')
         .whereIn('user_id', userIdArray)
         .orderBy('title');
   }

   public async addIngredient(context: HttpContextContract): Promise<Ingredient[]> {
      const { auth, request } = context;
      const data = { ...request.all(), ...{ user_id: auth.user!.id } };
      await Ingredient.create(data);
      return this.ingredientsList(context);
   }

   public async editIngredient(context: HttpContextContract): Promise<Ingredient[]> {
      const { auth, params, request } = context;
      await Ingredient
         .query()
         .where('id', params.id)
         .where('user_id', auth.user!.id)
         .update(request.all());

      return this.ingredientsList(context);
   }

   public async deleteIngredient(context: HttpContextContract): Promise<Ingredient[]> {
      const { auth, params } = context;
      await Ingredient
         .query()
         .where('id', params.id)
         .where('user_id', auth.user!.id)
         .delete();

      return this.ingredientsList(context);
   }

   protected async _getUserArray(auth: AuthContract): Promise<number[]> {
      await auth.check()
      const userId = auth.user?.id;
      return userId && userId !== 1 ? [1, userId] : [1];
   }

   // Menus
   public async menuList({ auth }: HttpContextContract): Promise<Menu[]> {
      try {
         await auth.check()
         const userId = auth.user!.id;

         return Menu.query()
            .select('id', 'title', 'content', 'settings', 'is_current', 'updated_at', 'user_id')
            .where('user_id', userId)
            .orderBy('id');
      } catch {
         return [];
      }
   }

   public async addMenu(context: HttpContextContract): Promise<Menu[]> {
      const { auth, request } = context;
      const data = { ...request.all(), ...{ user_id: auth.user!.id } };
      await Menu.create(data);
      return this.menuList(context);
   }

   public async updateMenu(context: HttpContextContract): Promise<Menu[]> {
      const { auth, params, request } = context;
      const updatedData = request.all();
      updatedData.updated_at = new Date();
      await Menu
         .query()
         .where('id', params.id)
         .where('user_id', auth.user!.id)
         .update(request.all());

      return this.menuList(context);
   }

   public async chooseMenu(context: HttpContextContract): Promise<Menu[]> {
      const { params, auth } = context;

      await Menu
         .query()
         .where('user_id', auth.user!.id)
         .update({
            'is_current': 0,
         });

      const currentMenu = await Menu.find(params.id);
      currentMenu!.is_current = true;
      await currentMenu!.save();

      return this.menuList(context);
   }

   public async deleteMenu(context: HttpContextContract): Promise<Menu[]> {
      const { params } = context;
      const menu = await Menu.find(params.id)
      if (menu) {
         await menu.delete();
      }

      return this.menuList(context);
   }
}
