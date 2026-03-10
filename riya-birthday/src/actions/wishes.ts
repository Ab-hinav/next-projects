"use server";

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { Wish } from '@/data/wishes';
// @ts-ignore
import convert from 'heic-convert';

const dataDir = path.join(process.cwd(), 'data');
const wishesFile = path.join(dataDir, 'wishes.json');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'wishes');

export async function getWishes(): Promise<Wish[]> {
  try {
    const data = await fs.readFile(wishesFile, 'utf8');
    if (!data || data.trim() === '') {
      return [];
    }
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error("Error reading wishes:", error);
    return [];
  }
}

export async function addWish(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const relation = formData.get('relation') as string;
    const message = formData.get('message') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name || !message) {
      throw new Error("Name and Message are required");
    }

    let imageUrl = '';

    // Handle Image upload if present
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
      // Ensure directory exists
      await fs.mkdir(imagesDir, { recursive: true });

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      let fileExt = path.extname(imageFile.name).toLowerCase();
      let finalBuffer = buffer;
      const isHeic = fileExt === '.heic' || fileExt === '.heif';

      if (isHeic) {
        try {
          finalBuffer = Buffer.from(await convert({
            buffer: buffer,
            format: 'JPEG',
            quality: 0.9
          }));
          fileExt = '.jpg';
        } catch (convertErr) {
          console.error("HEIC conversion error:", convertErr);
        }
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `${uniqueSuffix}${fileExt || '.jpg'}`;
      const filepath = path.join(imagesDir, filename);

      await fs.writeFile(filepath, finalBuffer);
      imageUrl = `/images/wishes/${filename}`;
    }

    const newWish: Wish = {
      id: Date.now().toString(),
      name,
      relation: relation || '',
      message,
      date: new Date().toISOString(),
      ...(imageUrl ? { imageUrl } : {}),
    };

    // Make sure data dir exists
    await fs.mkdir(dataDir, { recursive: true });

    // Read existing
    const existingWishes = await getWishes();

    // Insert at front
    const updatedWishes = [newWish, ...existingWishes];

    // Write back
    await fs.writeFile(wishesFile, JSON.stringify(updatedWishes, null, 2), 'utf8');

    // Revalidate the main page to show the new wish instantly
    revalidatePath('/');

    return { success: true, wish: newWish };
  } catch (error) {
    console.error('Failed to add wish:', error);
    return { success: false, error: 'Failed to save the wish. Please try again.' };
  }
}
