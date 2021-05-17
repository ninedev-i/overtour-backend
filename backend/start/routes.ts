import Route from '@ioc:Adonis/Core/Route'

Route.post('api/register', 'Auth.register');
Route.post('api/login' , 'Auth.login');
Route.post('api/logout' , 'Auth.logout');
Route.get('api/user' , 'Auth.getUserInfo');

Route.get('api/get_regions', 'Tours.getRegions');

Route.any('api/get_tours', 'Tours.getTours');
Route.get('api/get_tour/:id', 'Tours.getTour');
Route.get('api/get_all_drafts', 'Tours.getAllDrafts');

Route.group(()=>{
    Route.post('api/crawler/get_club_tours', 'Crawler.getClubTours');
    Route.post('api/crawler/get_tour_detail', 'Crawler.getTourDetails');
}).middleware('auth');

Route.get('api/dish', 'FoodCalculator.dishList');
Route.get('api/ingredient', 'FoodCalculator.ingredientsList');
Route.group(()=>{
    Route.post('api/dish', 'FoodCalculator.addDish');
    Route.put('api/dish/:id', 'FoodCalculator.editDish');
    Route.post('api/ingredient', 'FoodCalculator.addIngredient');
    Route.put('api/ingredient/:id', 'FoodCalculator.editIngredient');
}).middleware('auth');
