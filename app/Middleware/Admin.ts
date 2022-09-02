import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NoAccessException from 'App/Exceptions/NoAccessException';

export default class Admin {
   protected async checkIsAdmin(auth: HttpContextContract['auth']) {
      const userId = await auth.user.id;
      // TODO: add role field in db
      let guardLastAttempted: string | undefined
      if (userId === 1) {
         return true;
      }
      throw new NoAccessException(
         'No access',
         403,
         guardLastAttempted,
      )
   }

   public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
      await this.checkIsAdmin(auth);
      await next();
   }
}
