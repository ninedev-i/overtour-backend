import { DateTime } from 'luxon';

interface IBaseTourProps {
   title: string;
   date_from: string;
   date_to: string;
   duration: number;
   image: string;
   description: string;
   price: number;
   difficulty: number;
   region: string;
   tags: string[] | string;
   link: string;
   club: number;
   type: string;
   post: any;
}

interface TourDraft {
   title: string;
   date_from: DateTime;
   date_to: DateTime;
   club: number;
   link: string;
}

export default class BaseTour implements IBaseTourProps {
   public id: number
   public title: string = ''
   public date_from: string
   public date_to: string
   public duration: number = 0
   public image: string = ''
   public description: string = ''
   public price: number = 0
   public difficulty: number = 0
   public region: string = ''
   public tags: string[] = []
   public link: string = ''
   public club: number = 0
   public type: string = 'draft'
   // для описания ошибок добавления
   public post: any = {}

   public getAllFields(): TourDraft {
      return {
         title: this.title,
         date_from: DateTime.fromISO(this.date_from),
         date_to: DateTime.fromISO(this.date_to),
         club: this.club,
         link: this.link,
      }
   }

   public hasErrors(): boolean {
      return !!Object.entries(this.post).length
   }
}
