import { atom } from 'recoil';
export type ImageLoadObj = Record<number, HTMLImageElement | null>;
const landDefaultCoverImage: ImageLoadObj = {
  1: null,
  3: null,
  5: null,
  6: null,
  7: null,
};
// land default config cover
// TODO: from url to image
// export const landDefaultCoverUrlState = atom<ImageUrlObj>({
//   key: 'landDefaultCoverState',
//   default: landDefaultCoverImageUrl,
// });
// landDefaultCoverImageState base64 string
export const landDefaultCoverImageState = atom<ImageLoadObj>({
  key: 'landDefaultCoverImageState',
  default: landDefaultCoverImage,
});
