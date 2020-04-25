export default class Base {
   public title: string = '';
   public date_from: string = '';
   public date_to: string = '';
   public duration: number = 0;
   public image: string = '';
   public description: string = '';
   public price: number = 0;
   public difficulty: number = 0;
   public region: string = '';
   public tags: string[] = [];
   public link: string = '';
   public club: number = 0;
   public type: string = 'draft';
   // для описания ошибок добавления
   public post: object = {};

   public getAllFields(): {club: number, date_to: string, title: string, date_from: string, link: string, type: string} {
      return {
         title: this.title,
         date_from: this.date_from,
         date_to: this.date_to,
         link: this.link,
         club: this.club,
         type: this.type,
      }
   }

   public getUnique(): object {
      return {
         title: this.title,
         date_from: this.date_from,
         date_to: this.date_to,
      }
   }

   public hasErrors(): boolean {
      return !!Object.entries(this.post).length;
   }
}
