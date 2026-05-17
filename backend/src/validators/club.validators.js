import { z } from "zod";

const scheduleSchema = z.object({
  monday: z.string().optional(),
  tuesday: z.string().optional(),
  wednesday: z.string().optional(),
  thursday: z.string().optional(),
  friday: z.string().optional(),
  saturday: z.string().optional(),
  sunday: z.string().optional()
});

export const clubSchema = z.object({
  name: z.string().min(3),
  sport: z.string().min(2),

  address: z.string(),

  latitude: z.number(),
  longitude: z.number(),

  description: z.string().optional(),

  phone: z.string().optional(),
  email: z.string().email().optional(),

  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),

  imageUrl: z.string().optional(),

  hasParking: z.boolean().optional(),
  hasShower: z.boolean().optional(),
  hasStore: z.boolean().optional(),
  hasTrainer: z.boolean().optional(),

  priceMonthly: z.number().optional(),

  scheduleData: scheduleSchema.optional()
});