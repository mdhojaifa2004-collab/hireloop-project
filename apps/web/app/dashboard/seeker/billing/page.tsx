
"use client";

import { useState } from "react";
import {
  Bell, CheckCircle2, Crown, Download, Plus, CreditCard,
} from "lucide-react";

// FIX: Sidebar duplicated by the shared Seeker layout was removed from this page.
const history = [
  { date: "Nov 12, 2026", plan: "Professional Tier", amount: "$20.00", status: "Paid" },
  { date: "Oct 12, 2026", plan: "Professional Tier", amount: "$20.00", status: "Paid" },
  { date: "Sep 12, 2026", plan: "Professional Tier", amount: "$20.00", status: "Paid" },
  { date: "Aug 12, 2026", plan: "Professional Tier", amount: "$20.00", status: "Paid" },
];

export default function BillingPage() {
  const [paymentMethod, setPaymentMethod] = useState("Visa ending in 4242");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  return (
    <div className="min-h-full bg-[#0c0c0f] text-white">
      <header className="flex h-[72px] items-center justify-between border-b border-white/10 px-5 sm:px-8"><h1 className="font-semibold">Subscription & Billing</h1><div className="flex items-center gap-3"><Bell size={19} className="text-gray-400"/><span className="rounded-full bg-[#645AFF] px-3 py-2 text-sm">S</span></div></header>

      <div className="p-5 sm:p-8">
          <div className="mb-7"><p className="text-sm text-gray-400">Account Management</p><h2 className="mt-1 text-2xl font-bold">Subscription & Billing</h2><p className="mt-2 text-sm text-gray-500">Manage your subscription, payment methods, and invoices.</p></div>

          <div className="grid gap-5 xl:grid-cols-2">
            <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">Current Plan</h3><span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">Active</span></div>
              <div className="rounded-xl border border-[#645AFF]/30 bg-gradient-to-br from-[#282044] to-[#17151f] p-5">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-[#c5bfff]"><Crown size={17}/>Professional Tier</span><span className="text-xs text-gray-400">Monthly</span></div>
                <p className="mt-5 text-4xl font-bold">$20<span className="text-sm font-normal text-gray-400"> / month</span></p>
                <p className="mt-2 text-xs text-gray-400">Your next billing date is December 12, 2026.</p>
                <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm text-gray-300">
                  {["Unlimited job applications", "Priority profile visibility", "Advanced job recommendations", "Application tracking"].map(x => <p key={x} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400"/>{x}</p>)}
                </div>
              </div>
              <button onClick={() => alert("Plan management will be connected to the billing backend.")} className="mt-5 w-full rounded-lg bg-[#645AFF] px-4 py-3 text-sm font-semibold hover:bg-[#5147e8]">Manage Subscription</button>
            </section>

            <section className="rounded-xl border border-white/10 bg-[#15151a] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">Payment Method</h3><CreditCard className="text-[#8b83ff]"/></div>
              <div className="rounded-xl border border-[#645AFF]/30 bg-gradient-to-br from-[#30205a] to-[#15131f] p-5">
                <p className="text-xs text-gray-400">Current payment method</p>
                <p className="mt-5 text-xl font-semibold">•••• •••• •••• 4242</p>
                <div className="mt-5 flex items-end justify-between"><span className="text-xs text-gray-400">{paymentMethod}</span><span className="font-bold italic">VISA</span></div>
              </div>
              <button onClick={() => setShowPaymentOptions(!showPaymentOptions)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-3 text-sm hover:bg-white/5"><Plus size={16}/> Change Payment Method</button>
              {showPaymentOptions && <div className="mt-3 space-y-2">{["Visa ending in 4242", "Mastercard ending in 5555"].map(method => <button key={method} onClick={() => {setPaymentMethod(method);setShowPaymentOptions(false);}} className="w-full rounded-lg border border-white/10 p-3 text-left text-sm hover:border-[#645AFF]">{method}</button>)}</div>}
            </section>
          </div>

          <section className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#15151a]">
            <div className="flex items-center justify-between border-b border-white/10 p-5"><div><h3 className="font-semibold">Billing History</h3><p className="mt-1 text-xs text-gray-500">Your previous transactions</p></div><button onClick={() => alert("Invoice export will be available after backend integration.")} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5"><Download size={14}/> Export</button></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-white/[0.03] text-xs text-gray-500"><tr><th className="px-5 py-4">Date</th><th className="px-5 py-4">Description</th><th className="px-5 py-4">Amount</th><th className="px-5 py-4">Payment Method</th><th className="px-5 py-4">Status</th></tr></thead>
                <tbody className="divide-y divide-white/5">{history.map((item) => <tr key={item.date}><td className="px-5 py-4 text-gray-400">{item.date}</td><td className="px-5 py-4">{item.plan}</td><td className="px-5 py-4">{item.amount}</td><td className="px-5 py-4 text-gray-400">{paymentMethod}</td><td className="px-5 py-4"><span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">{item.status}</span></td></tr>)}</tbody>
              </table>
            </div>
          </section>
        </div>
    </div>
  );
}
