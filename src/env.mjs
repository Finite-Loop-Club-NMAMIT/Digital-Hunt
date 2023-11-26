import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL",
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    // Add ` on ID and SECRET if you want to make sure they're not empty
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_RECAPTCHA_SECRET: z.string(),
    ROUND1_ANSWERS: z.object({
      hiddenRoute: z.string().nullable(),
      loginRoute: z.string().nullable(),
      shifts: z.string().nullable(),
      playfairKey: z.string().nullable(),
      passcode: z.string().nullable(),
      captchaSolved: z.boolean().nullable(),
      hackerName: z.string().nullable(),
      hackerLocation: z.string().nullable(),
      hackerPin: z.string().nullable(),
      directEntry: z.string().nullable(),
    }),
    ROUND2_ANSWERS: z.object({
      firstWord: z.string().nullable(),
      secondWord: z.string().nullable(),
      thirdWord: z.string().nullable(),
      latitude: z.string().nullable(),
      longitude: z.string().nullable(),
      hexahue: z.string().nullable(),
      asciiResult: z.string().nullable(),
      badge: z.array(z.string()),
    }),
    ETHEREAL_EMAIL: z.string(),
    ETHEREAL_PASSWORD: z.string(),
    HINT_R1: z.object({
      1: z.string(),
      2: z.string(),
      3: z.string(),
      4: z.string(),
      5: z.string(),
      6: z.string(),
      7: z.string(),
    }),
    HINT_R2: z.object({
      1: z.string(),
      2: z.string(),
      3: z.string(),
      4: z.string(),
      5: z.string(),
      6: z.string(),
      7: z.string(),
    }),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_RECAPTCHA_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_RECAPTCHA_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
    GOOGLE_RECAPTCHA_SECRET: process.env.GOOGLE_RECAPTCHA_SECRET,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ROUND2_ANSWERS: process.env.ROUND2_ANSWERS
      ? JSON.parse(process.env.ROUND2_ANSWERS)
      : {},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ROUND1_ANSWERS: process.env.ROUND1_ANSWERS
      ? JSON.parse(process.env.ROUND1_ANSWERS)
      : {},
    HINT_R1: process.env.HINT_R1 ? JSON.parse(process.env.HINT_R1) : {},
    HINT_R2: process.env.HINT_R2 ? JSON.parse(process.env.HINT_R2) : {},
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
