// import { DefaultValue, selector } from 'recoil';
// import { landOwnerImageState } from '../atoms/landOwner';
// import type { ImageLoadObj } from '../atoms/landCover';
// import { createImage } from '../../utils';
// // // import { storage } from "@utils/index";

// // url to image
// export const landOwnerImageSelect = selector({
//   key: 'landOwnerImageSel',
//   get: async ({ get }) => {
//     // console.log(landOwnerBase64Obj);
//     let landOwnerImageObj = get(landOwnerImageState);
//     // console.log(landOwnerImageObj);
//     // const imageLoad: MapDataImgObj = {};
//     // for (let imgkey in landOwnerBase64Obj) {
//     //   if (landOwnerImageObj[imgkey]) {
//     //     imageLoad[imgkey] = landOwnerImageObj[imgkey];
//     //   } else {
//     //     let imgres = await createImage(landOwnerBase64Obj[imgkey]!); // 请求延迟 TODO
//     //     imageLoad[imgkey] = imgres;
//     //   }
//     // }
//     // landOwnerImageObj = imageLoad;
//     return landOwnerImageObj;
//   },
//   // set: ({ set }, newVal: ImageLoadObj | DefaultValue) => {
//   //   set(landOwnerState, newVal);
//   // },
// });
