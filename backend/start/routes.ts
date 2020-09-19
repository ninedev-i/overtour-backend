import Route from '@ioc:Adonis/Core/Route'

Route.get('api/get_regions', 'Tours.getRegions');

Route.any('api/get_tours', 'Tours.getTours');
Route.get('api/get_tour/:id', 'Tours.getTour');
Route.get('api/get_all_drafts', 'Tours.getAllDrafts');

Route.post('api/crawler/get_club_tours', 'Crawler.getClubTours');
Route.post('api/crawler/get_tour_detail', 'Crawler.getTourDetails');
