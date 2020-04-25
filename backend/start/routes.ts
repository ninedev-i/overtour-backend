import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Crawler.getDom');
// Route.get('api/get_regions', 'Tours.getRegions');
// Route.any('api/get_tours', 'Tours.getTours');
// Route.get('api/get_tour/:id', 'Tours.getTour');

Route.post('api/crawler/get_club_tours', 'Crawler.getClubTours');
