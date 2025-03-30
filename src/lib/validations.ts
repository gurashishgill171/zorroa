import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.name.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB",
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  email: optionalString,
  phoneNumber: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const portfolioSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
});

export type PortfolioValues = Omit<z.infer<typeof portfolioSchema>, "photo"> & {
  id?: string; // for new portfolios id will not be there inititally
  photo?: File | string | null;
};
