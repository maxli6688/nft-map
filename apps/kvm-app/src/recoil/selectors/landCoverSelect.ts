import { DefaultValue, selector } from 'recoil';
import { landDefaultCoverImageState } from '../atoms/landCover';
import type { ImageLoadObj } from '../atoms/landCover';
import { createImage, getImageUrl } from '../../utils';
// // import { storage } from "@utils/index";

const t001 = getImageUrl('001.png');
const t003 = getImageUrl('003.png');
const t005 = getImageUrl('005.png');
const t006 = getImageUrl('006.png');
const t007 = getImageUrl('007.png');

type ImageUrlObj = Record<number, string>;
const landDefaultCoverImageUrl: ImageUrlObj = {
  1: t001,
  3: t003,
  5: t005,
  6: t006,
  7: t007,
};
// url to image
export const landDefaultCoverImageSelect = selector({
  key: 'landDefaultCoverImageSel',
  get: async ({ get }) => {
    let mapDataImgObj = get(landDefaultCoverImageState);
    const imageLoad: ImageLoadObj = {};
    if (!mapDataImgObj[0]) {
      for (let img in landDefaultCoverImageUrl) {
        let imgres = await createImage(landDefaultCoverImageUrl[img]);
        imageLoad[img] = imgres;
      }
      mapDataImgObj = imageLoad;
    }
    return mapDataImgObj;
  },
  // set: ({ set }, newVal: ImageLoadObj | DefaultValue) => {
  //   set(landDefaultCoverState, newVal);
  // },
});
