import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';
import { GetProviderRealUser, ProvidersList } from '@ioc:Adonis/Addons/Auth';

export default class AuthController {
   public async register({ request, response }: HttpContextContract): Promise<void> {
      const validations = await schema.create({
         email: schema.string({}, [
            rules.email(),
            rules.unique({
               table: 'users',
               column: 'email',
            }),
         ]),
         password: schema.string({}, [
            rules.confirmed(),
         ]),
      });

      const data = await request.validate({
         schema: validations,
      });

      const user = await User.create({
         email: data.email,
         password: data.password,
      });

      return response.created(user);
   }

   public async login({ request, auth }: HttpContextContract): Promise<JSON> {
      const email = request.input('email');
      const password = request.input('password');
      const token = await auth.attempt(email, password);

      return token.toJSON();
   }

   public async logout({ auth }: HttpContextContract): Promise<void> {
      await auth.logout();
   }

   public async getUserInfo({ auth }: HttpContextContract): Promise<GetProviderRealUser<keyof ProvidersList>> {
      return auth.authenticate();
   }
}
