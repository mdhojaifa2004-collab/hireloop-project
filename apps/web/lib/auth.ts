import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_DB_URL as string);
const db = client.db('hireloopdb');

/**
 * Roles a user can pick on the sign-up form.
 * Keep in sync with `UserRole` in apps/web/components/auth-form.tsx.
 */
const SIGNUP_ROLES = ["seeker", "recruiter", "admin"] as const;

const roleSchema = {
  "~standard": {
    version: 1,
    vendor: "hireloop",
    validate(value: unknown) {
      return typeof value === "string" &&
        (SIGNUP_ROLES as readonly string[]).includes(value)
        ? { value }
        : {
            issues: [
              {
                message: `role must be one of: ${SIGNUP_ROLES.join(", ")}`,
              },
            ],
          };
    },
  },
} as const;

export const auth = betterAuth({
  //...

  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["seeker", 'recruiter', 'admin'],
        required: false,
        defaultValue: "seeker",
        input: true,
        // Reject anything outside the allowed roles instead of trusting the client.
        validator: {
          input: roleSchema,
        },
      }
    }
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});