import type { NextApiRequest, NextApiResponse } from 'next';
import { fileTypeFromBuffer } from 'file-type';
import getColors from 'get-image-colors';
import { z } from 'zod';

const COLOR_SIMILARITY_THRESHOLD = 40;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const bodySchema = z.object({
      images: z.array(z.string()),
    });
    const { images } = bodySchema.parse(req.body);
    const uniqueColors = new Set<string>();
    for (const image of images) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileType = await fileTypeFromBuffer(buffer);
      const mimeType = fileType?.mime;
      const colors = await getColors(buffer, {
        type: mimeType,
        count: 6,
      });
      const hexColors = colors.map(color => color.hex());
      for (const color of hexColors) {
        let isSimilar = false;
        const uniqueColorsArray = Array.from(uniqueColors);
        for (const uniqueColor of uniqueColorsArray) {
          if (areColorsSimilar(color, uniqueColor)) {
            isSimilar = true;
            break;
          }
        }
        if (!isSimilar) {
          uniqueColors.add(color);
        }
      }
    }
    res.status(200).json({ noOfColors: uniqueColors.size });
  }
}

function areColorsSimilar(color1: string, color2: string): boolean {
  const rgb1 = hexToRGB(color1);
  const rgb2 = hexToRGB(color2);
  const rDiff = rgb1.r - rgb2.r;
  const gDiff = rgb1.g - rgb2.g;
  const bDiff = rgb1.b - rgb2.b;
  const distance = Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  return distance <= COLOR_SIMILARITY_THRESHOLD;
}

function hexToRGB(hex: string): { r: number; g: number; b: number } {
  const normalizedHex = hex.replace(/^#/, '');
  const r = parseInt(normalizedHex.substr(0, 2), 16);
  const g = parseInt(normalizedHex.substr(2, 2), 16);
  const b = parseInt(normalizedHex.substr(4, 2), 16);
  return { r, g, b };
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};
