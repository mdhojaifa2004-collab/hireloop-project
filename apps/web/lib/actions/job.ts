// Shared client helpers for the existing Express jobs API.
// Keep this in sync with hireloop-server/index.js; do not create a second API.
const BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "")

// FIX: The old code imported the AddNewJobPage component and used it as a type,
// which failed TypeScript. This explicit type matches the form fields instead.
export type JobInput = {
  title: string
  company: string
  category: string
  jobType: string
  location: string
  minSalary: string
  maxSalary: string
  frequency: string
  deadline: string
  remote: boolean
  responsibilities: string
  qualifications: string
}

export type JobStatus = "Active" | "Closed" | "Draft" | "Pending" | "Rejected"

/**
 * A stored job. `type`/`salary` are legacy fields from the original demo
 * documents; the create form writes `jobType` and the salary fields. Screens
 * should handle both shapes so old and new MongoDB rows render correctly.
 */
export type JobRecord = JobInput & {
  _id: string
  type?: string
  salary?: string
  status?: JobStatus | string
  applicants?: number
  createdAt?: string
  updatedAt?: string
}

/**
 * Read jobs from the existing backend collection.
 * The backend now exposes GET /jobs (previously it returned 404).
 */
export const getJobs = async (): Promise<JobRecord[]> => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Could not load jobs (HTTP ${res.status}).`)
  }

  return res.json() as Promise<JobRecord[]>
}

export const createjob = async (data: JobInput) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  // FIX: Surface backend failures instead of returning a JSON parse error.
  if (!res.ok) {
    throw new Error(`Could not create the job (HTTP ${res.status}).`)
  }

  return res.json()
}

/**
 * Update an existing job by its MongoDB `_id`.
 * Added with PATCH /jobs/:id in the backend so edit/approve screens can persist.
 */
export const updateJob = async (
  id: string,
  data: Partial<JobInput> & { status?: JobStatus }
) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(`Could not update the job (HTTP ${res.status}).`)
  }

  return res.json()
}

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`Could not delete the job (HTTP ${res.status}).`)
  }

  return res.json()
}
