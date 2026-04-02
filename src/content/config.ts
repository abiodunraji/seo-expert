import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

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

export const collections = {
  services,
  cases,
};