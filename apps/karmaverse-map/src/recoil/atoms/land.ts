import { atom } from 'recoil';
// {...mapDataItem ...landOwnerItem}
export const curLandState = atom<AtlasTile | null>({
  key: 'curLandState',
  default: null,
});
export const landHoverState = atom<HoverTile | null>({
  key: 'landHoverState',
  default: null,
});
