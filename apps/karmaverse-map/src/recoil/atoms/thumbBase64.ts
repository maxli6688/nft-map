import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
const imglist: string[] = [];
// background:image -> browser make base64 -> storage
// render use base64string, change to image
// thumbBase64State string
export const thumbBase64State = atom<string[]>({
  key: 'thumbBase64State',
  default: imglist,
  effects_UNSTABLE: [persistAtom], // local storage cache
});
