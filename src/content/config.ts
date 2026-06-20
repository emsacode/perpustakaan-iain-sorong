import { defineCollection, z } from 'astro:content';

const beritaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    author: z.string().default('Admin Pustaka'),
    readTime: z.string().default('3 menit baca'),
  }),
});

export const collections = {
  berita: beritaCollection,
};
