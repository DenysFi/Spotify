import { z } from "zod";

function createEnv() {
  const envSchema = z.object({
    APP_URL: z.string().optional().default("http://localhost:3000"),
    API_KEY: z.string(),
    AUTH_DOMAIN: z.string(),
    PROJECT_ID: z.string(),
    STORAGE_BUCKET: z.string(),
    MESSAGING_SENDER_ID: z.string(),
    APP_ID: z.string(),
    MEASUREMENT_ID: z.string(),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_APP_")) {
      acc[key.replace("VITE_APP_", "")] = value;
    }
    return acc;
  }, {});

  const parsedEnvVars = envSchema.safeParse(envVars);

  if (!parsedEnvVars.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnvVars.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}
`
    );
  }
  return parsedEnvVars.data;
}

export const env = createEnv();
