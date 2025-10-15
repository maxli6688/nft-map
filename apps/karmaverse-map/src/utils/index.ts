// import { storage } from './localStorage';
import { http } from './request/http';
// import { clearPending } from './request/cancel';
// import { scrollToAnchor } from './scrollToAnchor';

/// / try catch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asyncCatch = (promise: Promise<any>) =>
  promise
    .then((res) => ({
      data: res.data || res.content || res.reulst || res,
      err: null,
    }))
    .catch((err) => {
      console.error('🍺async错误捕获', err);
      return {
        data: null,
        err,
      };
    });
const isCn = (lang: string) => ['zh', 'zh-CN'].includes(lang);

const getImageUrl = (name: string) =>
  new URL(`../assets/images/${name}`, import.meta.url).href;

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });
export {
  // storage,
  // asyncCatch,
  http,
  // clearPending,
  // scrollToAnchor,
  isCn,
  getImageUrl,
};
