import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | string | null | undefined>()
    .refine(
      (file) =>
        !file ||
        typeof file === "string" ||
        (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) =>
        !file ||
        typeof file === "string" ||
        (file as File).size <= 1024 * 1024 * 4,
      "File must be less than 4MB",
    )
    .optional(),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  email: optionalString,
  phoneNumber: optionalString,
  about: optionalString,
  linkedin: optionalString,
  githubUrl: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type SkillsValues = z.infer<typeof skillsSchema>;

export const projectSchema = z.object({
  projects: z.array(
    z.object({
      title: optionalString,
      description: optionalString,
      url: optionalString,
      skills: z.array(z.string().trim()).optional(),
      photoUrl: z
        .custom<File | string | null | undefined>()
        .refine(
          (file) =>
            !file ||
            typeof file === "string" ||
            (file instanceof File && file.type.startsWith("image/")),
          "Must be an image file",
        )
        .refine(
          (file) =>
            !file ||
            typeof file === "string" ||
            (file as File).size <= 1024 * 1024 * 4,
          "File must be less than 4MB",
        )
        .optional(),
    }),
  ),
});

export type ProjectValues = z.infer<typeof projectSchema>;

export const portfolioSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...projectSchema.shape,
});

export type PortfolioValues = z.infer<typeof portfolioSchema> & {
  id?: string; // for new portfolios id will not be there inititally
};
