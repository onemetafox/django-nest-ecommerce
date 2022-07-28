import { getPlaiceholder } from 'plaiceholder';

export async function getPlaiceholderList(list, imageExtractor, options) {
  const plaiceholderList = [...list];

  for (let itemIndex = 0; itemIndex < plaiceholderList.length; itemIndex++) {
    const item = plaiceholderList[itemIndex];
    const { base64, img } = await getPlaiceholder(
      imageExtractor?.(item) ?? item,
      options,
    );

    plaiceholderList[itemIndex] = {
      ...item,
      imageProps: { ...img, blurDataURL: base64 },
    };
  }

  return plaiceholderList;
}
