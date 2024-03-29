import Route from '@ioc:Adonis/Core/Route';

Route.post('api/register', 'Auth.register');
Route.post('api/login' , 'Auth.login');
Route.post('api/logout' , 'Auth.logout');
Route.get('api/user' , 'Auth.getUserInfo');

Route.get('api/regions', 'Tours.getRegions');

Route.any('api/tour', 'Tours.getTours');
Route.get('api/tour/:id', 'Tours.getTour');

Route.group(()=>{
   Route.get('api/drafts', 'Tours.getAllDrafts');
   Route.post('api/crawler/club_tours', 'Crawler.getClubTours');
   Route.post('api/crawler/tour_detail', 'Crawler.getTourDetails');
   Route.post('api/crawler/parse_details_by_club', 'Crawler.getDetailsByClub');
}).middleware(['auth', 'admin']);

Route.get('api/dish', 'FoodCalculator.dishList');
Route.get('api/menu', 'FoodCalculator.menuList');
Route.get('api/ingredient', 'FoodCalculator.ingredientsList');
Route.group(()=>{
   Route.post('api/dish', 'FoodCalculator.addDish');
   Route.put('api/dish/:id', 'FoodCalculator.editDish');
   Route.delete('api/dish/:id', 'FoodCalculator.deleteDish');
   Route.post('api/dish/is_used/:id', 'FoodCalculator.checkIsDishUsed');
   Route.post('api/ingredient', 'FoodCalculator.addIngredient');
   Route.put('api/ingredient/:id', 'FoodCalculator.editIngredient');
   Route.delete('api/ingredient/:id', 'FoodCalculator.deleteIngredient');
   Route.post('api/menu', 'FoodCalculator.addMenu');
   Route.put('api/menu/:id/choose', 'FoodCalculator.chooseMenu');
   Route.put('api/menu/:id', 'FoodCalculator.updateMenu');
   Route.delete('api/menu/:id', 'FoodCalculator.deleteMenu');
}).middleware('auth');
