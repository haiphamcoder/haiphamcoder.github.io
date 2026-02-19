import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    excerpt: z.string().optional(),
    lang: z.enum(["vi", "en"]).default("vi"),
    slug: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
