"use server";

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { Wish } from '@/data/wishes';
// @ts-expect-error no types available
import convert from 'heic-convert';

const dataDir = path.join(process.cwd(), 'data');
const wishesFile = path.join(dataDir, 'wishes.json');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'wishes');


// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function getWishes(): Promise<Wish[]> {
  try {
    const data = await fs.readFile(wishesFile, 'utf8');
    if (!data || data.trim() === '') {
      return [];
    }
    return JSON.parse(data);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && (error as { code?: string }).code === 'ENOENT') {
      return [];
    }
    console.error("Error reading wishes:", error);
    return [];
  }
}

export async function addWish(formData: FormData) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown-ip';

    if (!checkRateLimit(ip)) {
      return { success: false, error: 'Too many requests. Please try again later.' };
    }

    const name = formData.get('name') as string;
    const relation = formData.get('relation') as string;
    const message = formData.get('message') as string;
    const imageFile = formData.get('image') as File | null;
    const passcode = formData.get('passcode') as string;

    if (passcode !== process.env.SUBMISSION_PASSCODE) {
      return { success: false, error: 'Incorrect secret passcode. You cannot submit.' };
    }

    if (!name || typeof name !== 'string' || name.trim() === '' || !message || typeof message !== 'string' || message.trim() === '') {
      return { success: false, error: "Name and Message are required" };
    }

    if (name.length > 100) {
      return { success: false, error: "Name is too long" };
    }
    if (relation && relation.length > 100) {
      return { success: false, error: "Relation is too long" };
    }
    if (message.length > 20000) {
      return { success: false, error: "Message is too long" };
    }


    let imageUrl = '';

    // Handle Image upload if present
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
      if (imageFile.size > 10 * 1024 * 1024) {
        return { success: false, error: "Image file is too large (max 5MB)" };
      }

      // Ensure directory exists
      await fs.mkdir(imagesDir, { recursive: true });

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      let fileExt = path.extname(imageFile.name).toLowerCase();

      const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif'];
      if (!allowedExts.includes(fileExt)) {
        return { success: false, error: "Invalid image file format" };
      }

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
