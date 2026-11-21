
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Plus,
  Send,
} from "lucide-react";
import { createjob } from "@/lib/actions/job";

export default function AddNewJobPage() {
  const [formData, setFormData] = useState({
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
  });

  const [message, setMessage] = useState("");
  // FIX: Track submission so the button cannot be clicked twice.
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    setMessage("");

    // FIX: Backend failures are now caught and shown instead of being logged only.
    try {
      await createjob(formData);
      setMessage("Job submitted successfully. It will appear in Manage Job Posts once reviewed.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not publish the job. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#17171c] px-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#645AFF]";

  const labelClass = "block text-sm font-medium text-gray-300";

  return (
    // FIX: The dashboard layout already renders <main>, so this page uses a div.
    <div className="min-h-full bg-[#0c0c0f] px-5 py-7 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Heading */}
        <div className="mb-7">
          <Link
            href="/dashboard/recruiter"
            className="mb-5 inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Manage Jobs / Add Job
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                Post a New Job
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Create a new job opportunity and attract qualified candidates.
              </p>
            </div>

            <div className="flex size-12 items-center justify-center rounded-xl bg-[#645AFF]/15 text-[#8b83ff]">
              <BriefcaseBusiness size={23} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Information */}
          <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#645AFF]/15 text-[#9b94ff]">
                <BriefcaseBusiness size={18} />
              </div>
              <div>
                <h2 className="font-semibold">1. Basic Information</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Enter the basic details about this job.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <label className={labelClass}>
                Job Title *
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
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
                    placeholder="Enter company name"
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
                    <option value="Engineering & Tech">Engineering & Tech</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business">Business</option>
                    <option value="Finance">Finance</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <div>
                <p className={labelClass}>Job Type *</p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData((previous) => ({
                          ...previous,
                          jobType: type,
                        }))
                      }
                      className={`rounded-lg border px-3 py-3 text-sm transition ${
                        formData.jobType === type
                          ? "border-[#645AFF] bg-[#645AFF]/15 text-[#a49eff]"
                          : "border-white/10 bg-[#17171c] text-gray-400 hover:border-white/30"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Location and Compensation */}
          <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#645AFF]/15 text-[#9b94ff]">
                <MapPin size={18} />
              </div>
              <div>
                <h2 className="font-semibold">2. Location, Compensation & Timeline</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Set the location, salary and application deadline.
                </p>
              </div>
            </div>

            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-[#17171c] p-4">
              <div>
                <p className="text-sm font-medium">Remote Work Allowed (Optional)</p>
                <p className="mt-1 text-xs text-gray-500">
                  Enable this if candidates can work remotely.
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
                Job Location *
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Application Deadline *
                <div className="relative">
                  <CalendarDays className="absolute right-3 top-5 text-gray-500" size={16} />
                  <input
                    required
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClass}
                  />
                </div>
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
                  placeholder="Min Salary"
                  className="h-11 rounded-lg border border-white/10 bg-[#17171c] px-3 text-sm outline-none focus:border-[#645AFF]"
                />
                <input
                  type="number"
                  min="0"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="Max Salary"
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

          {/* Responsibilities */}
          <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="font-semibold">3. Responsibilities & Requirements</h2>
              <p className="mt-1 text-xs text-gray-500">
                Explain the role and what you expect from candidates.
              </p>
            </div>

            <label className={labelClass}>
              Key Responsibilities *
              <textarea
                required
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the main responsibilities of this job..."
                className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-[#17171c] p-3 text-sm outline-none placeholder:text-gray-600 focus:border-[#645AFF]"
              />
            </label>

            <label className={`${labelClass} mt-5`}>
              Qualifications & Requirements *
              <textarea
                required
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                rows={5}
                placeholder="List the required skills, qualifications and experience..."
                className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-[#17171c] p-3 text-sm outline-none placeholder:text-gray-600 focus:border-[#645AFF]"
              />
            </label>
          </section>

          {/* Submit */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
            {message && (
              <p role="status" className="max-w-xl text-sm text-green-400">
                {message}
              </p>
            )}

            <div className="ml-auto flex gap-3">
              <Link
                href="/dashboard/recruiter"
                className="rounded-lg border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-[#645AFF] px-5 py-3 text-sm font-semibold transition hover:bg-[#5147e8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Publishing..." : "Publish Job"} <Send size={15} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
