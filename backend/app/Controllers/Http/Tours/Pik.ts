import BaseTour from './Base';

export default class Pik extends BaseTour {
   constructor(document) {
      super();
      this.getTitle(document);
      this.getDate(document);
      this.getLink(document);
      // this.getPrice(document);
      // this.getImage(document);
      // this.getDescription(document);
      // this.getRegion(region);
      this.club = 4;
   }

   getTitle(document) {
      try {
         this.title = document.name;
      } catch (e) {
         this.post.title = e.message;
         this.type = 'error';
      }
   }

   getDate(document) {
      try {
         const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
         let dates = document['duration_explained'].match(/с (\d+)\s*(\W*)\s*(\d*) по (\d+) (\W*) (\d+)/i);

         let date_to = dates[4] < 10 ? `0${dates[4]}` : dates[4];
         let month_to: string | number = months.indexOf(dates[5]) + 1;
         month_to = month_to < 10 ? `0${month_to}` : month_to;

         let date_from = dates[1] < 10 ? `0${dates[1]}` : dates[1];
         let month_from = dates[2] || dates[5];
         month_from = months.indexOf(month_from) + 1;
         month_from = month_from < 10 ? `0${month_from}` : month_from;
         const year_from = dates[3] || dates[6];
         this.date_from = `${year_from}-${month_from}-${date_from}T00:00:00Z`;
         this.date_to = `${dates[6]}-${month_to}-${date_to}T00:00:00Z`;
      } catch (e) {
         this.post.date_from = e.message;
         this.post.date_to = e.message;
         this.type = 'error';
      }
   }

   getPrice(document) {
      try {
         const price = document.querySelector('.price .number').textContent;
         this.price = +price.replace(/[\s, \W]/g, '');
      } catch (e) {
         this.post.price = e.message;
         this.type = 'error';
      }
   }

   getImage(document) {
      try {
         this.image = document.querySelector('.block_image img').getAttribute('src');
      } catch (e) {
         this.post.image = e.message;
         this.type = 'error';
      }
   }

   getLink(document) {
      try {
         const host = 'https://turclub-pik.ru';
         this.link = host + document['absolute_url'];
      } catch (e) {
         this.post.link = e.message;
         this.type = 'error';
      }
   }

   getDescription(document) {
      try {
         let description = document.querySelector('.description').textContent.trim();
         description = description.replace('/\n/g',' ');
         this.description = description;
      } catch (e) {
         this.post.description = e.message;
         this.type = 'error';
      }
   }

   // getRegion(document) {
   //    try {
   //       this.region = region;
   //    } catch (e) {
   //       this.post.region = e.message;
   //    }
   // }
}
