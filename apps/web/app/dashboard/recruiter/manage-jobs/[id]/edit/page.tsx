
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Save,
} from "lucide-react";

import { getJobs, updateJob, type JobRecord } from "@/lib/actions/job";

type JobForm = {
  title: string;
  company: string;
  category: string;
  jobType: string;
  location: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  deadline: string;
  remote: boolean;
  responsibilities: string;
  qualifications: string;
};

// FIX: The edit page previously read local demo ids (1-5). It now loads the
// actual MongoDB row through the existing GET /jobs endpoint, so only real
// recruiter jobs can be edited.
function jobToForm(job: JobRecord): JobForm {
  return {
    title: job.title ?? "",
    company: job.company ?? "",
    category: job.category ?? "",
    jobType: job.jobType || job.type || "Full-time",
    location: job.location ?? "",
    minSalary: job.minSalary ?? "",
    maxSalary: job.maxSalary ?? "",
    frequency: job.frequency || "Per month",
    deadline: (job.deadline ?? "").slice(0, 10),
    remote: Boolean(job.remote),
    responsibilities: job.responsibilities ?? "",
    qualifications: job.qualifications ?? "",
  };
}

const emptyForm: JobForm = {
  title: "",
  company: "",
  category: "",
  jobType: "Full-time",
  location: "",
  minSalary: "",
  maxSalary: "",
  frequency: "Per month",
  deadline: "",
  remote: false,
  responsibilities: "",
  qualifications: "",
};

export default function UpdateJobPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [formData, setFormData] = useState<JobForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadJob = async () => {
      try {
        setLoading(true);
        setError("");

        // The backend has no GET /jobs/:id yet, so reuse the existing list
        // endpoint and select the requested MongoDB document.
        const jobs = await getJobs();
        const job = jobs.find((item) => item._id === params.id);

        if (!isMounted) return;

        if (job) {
          setFormData(jobToForm(job));
          setFound(true);
        } else {
          setFound(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Could not load this job."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadJob();

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      // FIX: Persist through PATCH /jobs/:id instead of logging to the console.
      await updateJob(params.id, formData);

      setMessage("Job updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save the changes."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#17171c] px-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#645AFF]";

  const labelClass = "block text-sm font-medium text-gray-300";

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading job information...
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="p-10 text-center text-white">
        <h1 className="text-xl font-bold">Could not load this job</h1>
        <p className="mt-2 text-sm text-red-400">{error}</p>
        <Link
          href="/dashboard/recruiter/manage-jobs"
          className="mt-4 inline-block text-[#938cff]"
        >
          Back to Manage Jobs
        </Link>
      </div>
    );
  }

  if (!found) {
    return (
      <div className="p-10 text-center text-white">
        <h1 className="text-xl font-bold">Job Not Found</h1>
        <p className="mt-2 text-sm text-gray-400">
          This job does not exist in the database.
        </p>
        <Link
          href="/dashboard/recruiter/manage-jobs"
          className="mt-4 inline-block text-[#938cff]"
        >
          Back to Manage Jobs
        </Link>
      </div>
    );
  }

  return (
    // FIX: The dashboard layout already renders <main>, so this page uses a div.
    <div className="min-h-full bg-[#0c0c0f] px-5 py-7 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/dashboard/recruiter/manage-jobs"
          className="mb-5 inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to Manage Jobs
        </Link>

        <div className="mb-7 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-[#645AFF]/15 text-[#938cff]">
            <BriefcaseBusiness size={23} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Manage Jobs / Edit Job</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Update Job Post
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Edit your job information and save your changes.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
            <h2 className="mb-5 font-semibold">1. Basic Information</h2>

            <div className="space-y-5">
              <label className={labelClass}>
                Job Title *
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Company Name *
                  <input
                    required
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Job Category *
                  <select
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    <option>Engineering & Tech</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Business</option>
                    <option>Finance</option>
                    <option>Customer Support</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <label className={labelClass}>
                Job Type *
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <MapPin size={18} className="text-[#938cff]" />
              <h2 className="font-semibold">2. Location & Compensation</h2>
            </div>

            <label className="flex items-center justify-between rounded-lg border border-white/10 bg-[#17171c] p-4">
              <div>
                <p className="text-sm font-medium">Remote Work Allowed</p>
                <p className="mt-1 text-xs text-gray-500">
                  Allow candidates to work remotely.
                </p>
              </div>
              <input
                type="checkbox"
                name="remote"
                checked={formData.remote}
                onChange={handleChange}
                className="size-4 accent-[#645AFF]"
              />
            </label>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Location *
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                <span className="flex items-center gap-2">
                  <CalendarDays size={15} />
                  Application Deadline *
                </span>
                <input
                  required
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-5">
              <p className={labelClass}>Salary / Rate</p>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                <input
                  type="number"
                  min="0"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  placeholder="Minimum"
                  className="h-11 rounded-lg border border-white/10 bg-[#17171c] px-3 text-sm outline-none focus:border-[#645AFF]"
                />
                <input
                  type="number"
                  min="0"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="Maximum"
                  className="h-11 rounded-lg border border-white/10 bg-[#17171c] px-3 text-sm outline-none focus:border-[#645AFF]"
                />
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="h-11 rounded-lg border border-white/10 bg-[#17171c] px-3 text-sm outline-none focus:border-[#645AFF]"
                >
                  <option>Per month</option>
                  <option>Per year</option>
                  <option>Per hour</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
            <h2 className="mb-5 font-semibold">3. Responsibilities & Requirements</h2>

            <label className={labelClass}>
              Key Responsibilities *
              <textarea
                required
                rows={5}
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#17171c] p-3 text-sm outline-none focus:border-[#645AFF]"
              />
            </label>

            <label className={`${labelClass} mt-5`}>
              Qualifications & Requirements *
              <textarea
                required
                rows={5}
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#17171c] p-3 text-sm outline-none focus:border-[#645AFF]"
              />
            </label>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
            {message && (
              <p role="status" className="text-sm text-green-400">
                {message}
              </p>
            )}

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="ml-auto flex gap-3">
              <Link
                href="/dashboard/recruiter/manage-jobs"
                className="rounded-lg border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#645AFF] px-5 py-3 text-sm font-semibold hover:bg-[#5147e8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
