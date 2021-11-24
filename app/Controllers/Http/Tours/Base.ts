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

export interface TourDraft {
   id?: number;
   title: string;
   date_from: DateTime;
   date_to: DateTime;
   club: number;
   link: string;
}

type TourLucidModel = Omit<IBaseTourProps, 'id' | 'type' | 'post' | 'date_from' | 'date_to'> & {
   date_from: DateTime;
   date_to: DateTime;
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

   public getDraftFields(): TourDraft {
      return {
         title: this.title,
         date_from: DateTime.fromISO(this.date_from),
         date_to: DateTime.fromISO(this.date_to),
         club: this.club,
         link: this.link,
      }
   }

   public getAllFields(): TourLucidModel {
      return {
         title: this.title,
         date_from: DateTime.fromISO(this.date_from),
         date_to: DateTime.fromISO(this.date_to),
         duration: Math.floor((Date.parse(this.date_to) - Date.parse(this.date_from)) / 86400000) + 1,
         image: this.image,
         description: this.description,
         price: this.price,
         difficulty: this.difficulty,
         region: this.region,
         tags: Array.isArray(this.tags) ? this.tags.join(): this.tags,
         link: this.link,
         club: this.club,
      }
   }

   public hasErrors(): boolean {
      return !!Object.entries(this.post).length
   }
}
