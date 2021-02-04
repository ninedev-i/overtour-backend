import Jimp from 'jimp';
import {writeFile, mkdirSync, existsSync} from 'fs';

export function downloadImage(url: string, id: number) {
    const folder = `./public/images/${id}/`;
    let imageUrl = url;

    if (!existsSync(folder)){
        mkdirSync(folder);
    }

    if (Array.isArray(url.match('data:image'))) {
        imageUrl = folder + 'cover.jpg';
        const base64Data = url.replace(/^data:image\/jpg;base64,/, '')
        const binaryData = Buffer.from(base64Data, 'base64').toString('binary');

        writeFile(imageUrl, binaryData, 'binary', (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }

    saveImage(imageUrl, folder);
}

function saveImage(url: string, folder: string) {
    Jimp.read(url)
        .then((image) => {
            image
                .cover(240, 160)
                .write(`${folder}cover.jpg`);
        })
        .catch((err) => {
            console.error(err);
        });
}
