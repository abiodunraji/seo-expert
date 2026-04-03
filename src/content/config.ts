import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    image: z.string().optional(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

// Cases collection - temporarily disabled, re-add later
/*
// Cases collection - temporarily disabled, re-add later
/*
const cases = defineCollection({
  type: 'content',
  schema: z.object({
    client: z.string(),
    title: z.string(),
    summary: z.string(),
    results: z.array(
      z.object({
        metric: z.string(),
        value: z.string(),
      })
    ),
    date: z.date(),
    featured: z.boolean().default(false),
  }),
});
*/

export const collections = {
  services,
  // cases,
};