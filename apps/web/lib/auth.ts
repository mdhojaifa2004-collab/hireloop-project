import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_DB_URL as string);
const db = client.db('hireloopdb');

/**
 * Roles a user can pick on the public sign-up form.
 * Admin is intentionally excluded: admin accounts must be provisioned by an
 * operator, never self-assigned during registration.
 * Keep in sync with `UserRole` in apps/web/components/auth-form.tsx.
 */
const SIGNUP_ROLES = ["seeker", "recruiter"] as const;

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
        // Stored as a string so existing admin accounts still work. The input
        // validator below blocks admin (and any other value) at sign-up/update.
        type: "string",
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

  // Only register Google when both credentials exist. Registering it with empty
  // values makes better-auth warn and exposes a button that cannot work.
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        },
      }
    : {}),

  database: mongodbAdapter(db, {
    client,
  }),
});