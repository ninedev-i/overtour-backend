// // import {images as download} from 'images-downloader';
// import fs from 'fs';
// import * as request from 'request-promise';
// import {JSDOM} from 'jsdom';
//
// // const dest = './';
// // const images = ['https://clubstrannik.ru/kareliya/ladoga-onega']
// //
// // download(images, dest)
// //     .then(result => {
// //         console.log('Images downloaded', result);
// //     })
// //     .catch(error => console.log('downloaded error', error))
//
// const parseData = async () => {
//     const website = await request.get('https://clubstrannik.ru/kareliya/ladoga-onega');
//     const document = new JSDOM(website).window.document;
//
//     const data = document.querySelector('.swiper_slide_bunners img').src;
//
//     const base64Data = data
//         .replace(/^data:image\/jpg;base64,/, '')
//         .replace('+', ' ');
//
//     const binaryData = Buffer.from(base64Data, 'base64').toString('binary');
//
//     fs.writeFile('out.jpg', binaryData, 'binary', (err) => {
//         console.log(err);
//     });
// }
// parseData();
//
//
