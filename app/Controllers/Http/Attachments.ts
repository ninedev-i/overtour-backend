import Jimp from 'jimp';

export default class Attachments {
   public async saveAttachment(url: string = '') {
      return Jimp.read(url)
         .then(img => {
            return img
               .resize(256, 256)
               .quality(60)
               .greyscale()
               .write('img_name.jpg');
         });
   }
}
