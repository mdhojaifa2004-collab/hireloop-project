/**
 * Trusted admin provisioning script.
 *
 * Promotes ONE existing user to the "admin" role by email address.
 * Run it from a terminal on the server, never from the browser:
 *
 *   npm run make-admin -- person@example.com
 *
 * Why a script instead of a page?
 * - The public sign-up form only offers "seeker" and "recruiter".
 * - better-auth's validator rejects "admin" on every API request.
 * - So the only way to create an admin is a trusted process that can reach
 *   the database directly, which is exactly what this file is.
 */

import path from "node:path"
import { fileURLToPath } from "node:url"

import nextEnv from "@next/env"
import { MongoClient } from "mongodb"

const { loadEnvConfig } = nextEnv

// --- 1. Load the same environment files the Next.js app uses ---------------
// This repo keeps its secrets in the root .env, so:
//   apps/web/scripts -> up 3 folders -> repository root
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, "../../..")
loadEnvConfig(repoRoot)

// --- 2. Read the email from the command line -------------------------------
const rawEmail = process.argv[2]

if (!rawEmail) {
  console.error("Usage: npm run make-admin -- person@example.com")
  process.exit(1)
}

// better-auth stores emails in lowercase, so compare the same way.
const email = rawEmail.trim().toLowerCase()

// Simple check. It only needs to catch obvious typos, not validate fully.
const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

if (!looksLikeEmail) {
  console.error(`"${rawEmail}" does not look like a valid email address.`)
  process.exit(1)
}

// --- 3. Read the database URL from the environment -------------------------
// Never hardcode credentials: the URL comes from the existing root .env file.
const mongoUrl = process.env.BETTER_AUTH_MONGO_DB_URL

if (!mongoUrl) {
  console.error(
    "BETTER_AUTH_MONGO_DB_URL is not set. Add it to the root .env file first."
  )
  process.exit(1)
}

// --- 4. Promote the user ---------------------------------------------------
// A short timeout makes a network problem fail fast with a clear message.
const client = new MongoClient(mongoUrl, { serverSelectionTimeoutMS: 10000 })

async function main() {
  await client.connect()

  // better-auth stores users in the "user" collection of this database.
  const users = client.db("hireloopdb").collection("user")

  // Requirement: confirm the user exists BEFORE changing anything.
  const user = await users.findOne({ email }, { projection: { _id: 1, role: 1 } })

  if (!user) {
    console.error(`No user found with the email ${email}. Nothing was changed.`)
    process.exitCode = 1
    return
  }

  if (user.role === "admin") {
    console.log(`${email} is already an admin. Nothing to do.`)
    return
  }

  // Update that single document, and only its role field.
  const result = await users.updateOne({ _id: user._id }, { $set: { role: "admin" } })

  if (result.modifiedCount !== 1) {
    console.error(`Could not update ${email}. Nothing was changed.`)
    process.exitCode = 1
    return
  }

  console.log(`Done. ${email} is now an admin.`)
  console.log("Sign out and sign in again so the new role is in the session.")
}

main()
  .catch((error) => {
    // Only the error message is printed: no connection string, no secrets.
    console.error("Admin update failed:", error.message)
    process.exitCode = 1
  })
  .finally(() => {
    // Always close the connection so the terminal command can exit.
    client.close().catch(() => {})
  })
