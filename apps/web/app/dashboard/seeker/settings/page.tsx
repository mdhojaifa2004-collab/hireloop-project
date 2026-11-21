
"use client";

import { useState } from "react";
import {
  Bell, Upload, Save, UserRound,
} from "lucide-react";

// FIX: Sidebar duplicated by the shared Seeker layout was removed from this page.
export default function SeekerSettingsPage() {
  const [name, setName] = useState("Sami Hasan");
  const [email, setEmail] = useState("sami@example.com");
  const [phone, setPhone] = useState("+880 1XXXXXXXXX");
  const [location, setLocation] = useState("Narsingdi, Bangladesh");
  const [jobTitle, setJobTitle] = useState("Frontend Developer");
  const [experience, setExperience] = useState("Beginner");
  const [skills, setSkills] = useState("React, Next.js, TypeScript, Tailwind CSS");
  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Your changes are ready. Connect the save API to store them permanently.");
  };

  return (
    <div className="min-h-full bg-[#0c0c0f] text-white">
      <header className="flex h-[72px] items-center justify-between border-b border-white/10 px-5 sm:px-8">
        <h1 className="font-semibold">Settings</h1>
        <div className="flex items-center gap-3"><Bell size={19} className="text-gray-400"/><span className="rounded-full bg-[#645AFF] px-3 py-2 text-sm">S</span></div>
      </header>

      <div className="p-5 sm:p-8">
          <div className="mb-7"><p className="text-sm text-gray-400">Account Preferences</p><h2 className="mt-1 text-2xl font-bold">Settings</h2><p className="mt-2 text-sm text-gray-500">Manage your personal and professional information.</p></div>

          <form onSubmit={handleSubmit} className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-5">
              <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
                <div className="mb-6 flex items-center gap-3"><UserRound className="text-[#8b83ff]"/><div><h3 className="font-semibold">Profile Information</h3><p className="text-xs text-gray-500">Your personal details</p></div></div>

                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#645AFF] text-xl font-bold">{name.charAt(0).toUpperCase()}</div>
                  <div><p className="font-medium">{name}</p><p className="mt-1 text-xs text-gray-500">Profile photo</p></div>
                  <button type="button" onClick={() => alert("Connect your profile image upload API here.")} className="rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5">Update Photo</button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-gray-400">Full Name<input value={name} onChange={e => setName(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#101014] px-3 text-white outline-none focus:border-[#645AFF]"/></label>
                  <label className="text-sm text-gray-400">Email Address<input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#101014] px-3 text-white outline-none focus:border-[#645AFF]"/></label>
                  <label className="text-sm text-gray-400">Phone Number<input value={phone} onChange={e => setPhone(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#101014] px-3 text-white outline-none focus:border-[#645AFF]"/></label>
                  <label className="text-sm text-gray-400">Location<input value={location} onChange={e => setLocation(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#101014] px-3 text-white outline-none focus:border-[#645AFF]"/></label>
                </div>
              </section>

              <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
                <h3 className="font-semibold">Professional Details</h3>
                <p className="mb-5 mt-1 text-xs text-gray-500">Information about your career and skills</p>
                <div className="space-y-4">
                  <label className="block text-sm text-gray-400">Professional Title<input value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#101014] px-3 text-white outline-none focus:border-[#645AFF]"/></label>
                  <label className="block text-sm text-gray-400">Experience Level<select value={experience} onChange={e => setExperience(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#101014] px-3 text-white outline-none focus:border-[#645AFF]"><option>Beginner</option><option>Intermediate</option><option>Experienced</option><option>Senior</option></select></label>
                  <label className="block text-sm text-gray-400">Skills<textarea value={skills} onChange={e => setSkills(e.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-white/10 bg-[#101014] p-3 text-white outline-none focus:border-[#645AFF]"/></label>
                </div>
              </section>

              <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
                <h3 className="font-semibold">Resume / CV</h3>
                <p className="mb-5 mt-1 text-xs text-gray-500">Upload your latest resume</p>
                <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-white/20 bg-[#101014] p-7 text-center hover:border-[#645AFF]">
                  <Upload className="mb-3 text-[#8b83ff]" size={25}/>
                  <span className="text-sm font-medium">{resume ? resume.name : "Choose your resume file"}</span>
                  <span className="mt-2 text-xs text-gray-500">PDF or DOCX format</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setResume(e.target.files?.[0] ?? null)}/>
                </label>
              </section>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="flex items-center gap-2 rounded-lg bg-[#645AFF] px-5 py-3 text-sm font-semibold hover:bg-[#5147e8]"><Save size={16}/>Save Changes</button>
                <button type="reset" onClick={() => {setName("Sami Hasan");setEmail("sami@example.com");setPhone("+880 1XXXXXXXXX");setLocation("Narsingdi, Bangladesh");setJobTitle("Frontend Developer");setExperience("Beginner");setSkills("React, Next.js, TypeScript, Tailwind CSS");setResume(null);setMessage("");}} className="rounded-lg border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5">Cancel</button>
              </div>
              {message && <p role="status" className="text-sm text-green-400">{message}</p>}
            </div>

            <aside className="rounded-xl border border-white/10 bg-[#15151a] p-5">
              <h3 className="font-semibold">Profile Summary</h3>
              <p className="mt-2 text-xs leading-5 text-gray-500">Keep your profile updated to help recruiters understand your experience.</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[75%] rounded-full bg-[#645AFF]"/></div>
              <p className="mt-2 text-xs text-gray-400">Profile completion: 75%</p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm font-medium">Resume Status</p>
                <p className="mt-2 text-xs text-gray-500">{resume ? `Selected: ${resume.name}` : "No new resume selected"}</p>
              </div>
            </aside>
          </form>
        </div>
    </div>
  );
}
