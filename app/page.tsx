"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  CircleCheck,
  CircleDot,
  ClipboardCheck,
  Droplets,
  Flag,
  HeartPulse,
  Landmark,
  Leaf,
  MapPin,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  Navigation,
  PackageOpen,
  ReceiptText,
  Route,
  Scale,
  Shield,
  Siren,
  Tag,
  Trash2,
  Users,
  Waves,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-context"

const issueChips = [
  { label: "Roads", icon: Route },
  { label: "Water", icon: Droplets },
  { label: "Power", icon: Zap },
  { label: "Garbage", icon: Trash2 },
  { label: "Safety", icon: Shield },
  { label: "Bribery", icon: Scale },
]

const modules = [
  { title: "Budget & spending", detail: "Where the money goes", icon: ReceiptText, tone: "blue" },
  { title: "Health", detail: "Government hospitals", icon: HeartPulse, tone: "rose" },
  { title: "Police & safety", detail: "Stations & services", icon: Shield, tone: "indigo" },
  { title: "Commitments & delivery", detail: "Promises, budget announcements & schemes", icon: ClipboardCheck, tone: "violet" },
  { title: "Water & dams", detail: "Bodies & storage", icon: Waves, tone: "cyan" },
  { title: "Roads & highways", detail: "Network & scorecard", icon: Route, tone: "orange" },
  { title: "Makkal Arangam", detail: "Ideas & consultations", icon: MessageCircle, tone: "teal" },
  { title: "Heritage", detail: "Monuments & history", icon: Landmark, tone: "gold" },
]

const mapMarkers = [
  [76, 14, "30"], [62, 18, "3"], [69, 25, "3"], [48, 31, "4"], [57, 28, "2"], [39, 40, "4"], [53, 40, "1"], [61, 49, "5"], [71, 48, "1"], [52, 56, "1"], [43, 68, "4"], [53, 76, "2"], [37, 82, "1"],
]

function TamilNaduMap() {
  return (
    <div className="relative mx-auto h-[430px] w-[390px] max-w-full sm:h-[485px] sm:w-[450px]">
      <svg viewBox="0 0 350 520" className="absolute inset-0 h-full w-full drop-shadow-[0_14px_20px_rgba(142,20,16,0.14)]" aria-label="Tamil Nadu issue map">
        <defs>
          <pattern id="districts" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 10L12 0 24 10 12 24z" fill="none" stroke="#d45a50" strokeWidth="0.8" opacity=".46" /></pattern>
          <clipPath id="tn-shape"><path d="M169 9c27 10 53 14 66 33l-4 24 28 20-16 26 14 28-27 28 19 36-19 28 2 40-25 20 9 28-20 20-1 38-29 21-11 43-21 25-14 50-28-7-20-28-4-42-18-22 8-30-20-25 14-33-1-35 22-20-3-41 22-32-5-32 26-23 0-29 23-12z" /></clipPath>
        </defs>
        <path d="M169 9c27 10 53 14 66 33l-4 24 28 20-16 26 14 28-27 28 19 36-19 28 2 40-25 20 9 28-20 20-1 38-29 21-11 43-21 25-14 50-28-7-20-28-4-42-18-22 8-30-20-25 14-33-1-35 22-20-3-41 22-32-5-32 26-23 0-29 23-12z" fill="#fff5f2" stroke="#c8473e" strokeWidth="2.4" />
        <path d="M169 9c27 10 53 14 66 33l-4 24 28 20-16 26 14 28-27 28 19 36-19 28 2 40-25 20 9 28-20 20-1 38-29 21-11 43-21 25-14 50-28-7-20-28-4-42-18-22 8-30-20-25 14-33-1-35 22-20-3-41 22-32-5-32 26-23 0-29 23-12z" fill="url(#districts)" />
        <g clipPath="url(#tn-shape)" stroke="#dd675c" strokeWidth="1" opacity=".6"><path d="M20 100h280M20 145h280M20 190h280M20 235h280M20 280h280M20 325h280M20 370h280M20 415h280M20 460h280" /><path d="M80 0v520M125 0v520M170 0v520M215 0v520M260 0v520" /></g>
      </svg>
      {mapMarkers.map(([left, top, value], index) => <span key={index} className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#8f0e0b] text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(90,0,0,.25)]" style={{ left: `${left}%`, top: `${top}%` }}>{value}</span>)}
    </div>
  )
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e9e9eb] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[60px] max-w-[1340px] items-center justify-between px-5 sm:px-7">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#a40000] text-white shadow-sm"><MapPin className="h-5 w-5 fill-[#f5c400]" /></span>
          <span className="leading-none"><span className="block text-[15px] font-bold text-[#292a30]">NammaTN</span><span className="block pt-0.5 text-[12px] font-bold text-[#a40000]">நம்ம தமிழ்நாடு</span></span>
        </Link>
        <nav className="hidden items-center gap-7 text-[14px] font-medium text-[#767983] md:flex"><Link href="/report" className="font-bold text-[#a40000]">Report</Link><Link href="/issues" className="hover:text-[#a40000]">Track</Link><Link href="/dashboard" className="hover:text-[#a40000]">Government</Link><Link href="/community" className="hover:text-[#a40000]">Tamil Nadu</Link></nav>
        <div className="flex items-center gap-2.5"><button className="hidden h-9 rounded-lg border border-[#d9dadd] px-3 text-[13px] font-bold text-[#a40000] sm:block">தமிழ்</button><button aria-label="Display settings" className="hidden h-9 w-9 items-center justify-center rounded-lg border border-[#d9dadd] text-[#7d8088] sm:flex"><span className="h-3.5 w-4 rounded border-2 border-current" /></button><Link href="/login" className="px-2 text-[13px] font-semibold text-[#70737c]">Sign in</Link><Link href="/register"><Button className="h-9 rounded-xl bg-[#a40000] px-5 text-[13px] text-white hover:bg-[#850000]">Join free</Button></Link></div>
      </div>
    </header>
  )
}

function TrackingSection() {
  const stages = [
    { title: "Reported", detail: "Filed with a photo and GPS location by a citizen.", color: "#4388f5", icon: Megaphone },
    { title: "Verified by 3 neighbours", detail: "Nearby citizens confirmed it — the report is now trusted.", color: "#0b9d92", icon: Users },
    { title: "Mapped for public reference", detail: "NammaTN identifies the relevant authority; the report is not sent to that office.", color: "#c8790c", icon: Navigation },
    { title: "Reporter marks it fixed", detail: "The reporter says the problem was fixed and shares what changed.", color: "#ff5d21", icon: CircleCheck },
    { title: "Fix verified by the community", detail: "Neighbours confirm the fix in the open.", color: "#16a34a", icon: Check },
  ]
  return <section className="bg-white px-5 py-20 sm:px-8"><div className="mx-auto max-w-[1050px]"><div className="text-center"><p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b5362e]">⌁ How tracking works</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#292a2f] sm:text-[34px]">Every issue, tracked in the open</h2><p className="mx-auto mt-3 max-w-[620px] text-[16px] text-[#8b8f98]">From a report to a community-verified fix — see what citizens confirmed and what remains unresolved.</p></div><div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4"><StatCard icon={Megaphone} label="Reported" value="70" percent="100% of reported" color="#4388f5" /><StatCard icon={Users} label="Community-verified" value="13" percent="19% of reported" color="#0b9d92" /><StatCard icon={Navigation} label="Fix reported" value="3" percent="4% of reported" color="#c8790c" /><StatCard icon={CircleCheck} label="Resolved & verified" value="1" percent="1% of reported" color="#16a34a" /></div><div className="mt-3 rounded-2xl border border-[#e6e7ea] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,.04)]"><div className="flex items-center justify-between"><h3 className="text-[15px] font-bold text-[#303139]">⌕ &nbsp;How a report moves</h3><span className="rounded-full bg-[#f6f7f8] px-3 py-1 text-[11px] font-semibold text-[#8c9098]">Example</span></div><h4 className="mt-4 text-[15px] font-bold text-[#35363c]">Overflowing garbage bin near a bus stop</h4><div className="mt-2 flex flex-wrap gap-2 text-[11px] text-[#7b7f88]"><span className="rounded-full bg-[#f4f5f6] px-2.5 py-1">🗑 Garbage & sanitation</span><span className="rounded-full bg-[#f4f5f6] px-2.5 py-1">⌖ Your neighbourhood</span><span className="rounded-full bg-[#f4f5f6] px-2.5 py-1">▣ Photo + GPS</span></div><div className="mt-6 grid gap-4 md:grid-cols-5">{stages.map(({ title, detail, color, icon: Icon }) => <div key={title} className="relative border-l-2 pl-4 md:border-l-0 md:border-t-2 md:pt-4" style={{ borderColor: color }}><span className="absolute -left-[9px] -top-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white" style={{ backgroundColor: color }}><Icon className="h-2.5 w-2.5 text-white" /></span><p className="text-[12px] font-bold text-[#383940]">{title}</p><p className="mt-1 text-[11px] leading-[1.35] text-[#858992]">{detail}</p></div>)}</div></div></div></section>
}

function StatCard({ icon: Icon, label, value, percent, color }: { icon: typeof Megaphone; label: string; value: string; percent: string; color: string }) {
  return <div className="rounded-2xl border border-[#e6e7ea] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,.04)]"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ backgroundColor: color }}><Icon className="h-4 w-4" /></span><span className="text-[11px] font-semibold text-[#727680]">{label}</span></div><div className="mt-2 flex items-end justify-between"><strong className="text-2xl text-[#2e3036]">{value}</strong><span className="text-[10px] text-[#7d8189]">{percent}</span></div><div className="mt-2 h-1 rounded-full bg-[#e7e8ea]"><div className="h-1 rounded-full" style={{ width: `${value === "70" ? "100" : value === "13" ? "19" : value === "3" ? "4" : "1"}%`, backgroundColor: color }} /></div></div>
}

function ExploreSection() {
  return <section className="bg-[#fafafa] px-5 py-20 sm:px-8"><div className="mx-auto max-w-[1050px]"><div className="text-center"><p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777d87]">Beyond issues</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#292a2f] sm:text-[34px]">Explore all of Tamil Nadu</h2><p className="mx-auto mt-3 max-w-[650px] text-[16px] text-[#8b8f98]">Every report connects to real government data — the departments, budgets and services behind it are all open to explore.</p></div><div className="mt-10 grid gap-4 md:grid-cols-[1.15fr_1fr_1fr]"><div className="row-span-4 rounded-2xl border border-[#eedda5] bg-gradient-to-br from-[#fffaf0] to-white p-6 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1c4] text-[#b98400]"><Landmark className="h-5 w-5" /></span><h3 className="mt-4 text-xl font-bold text-[#34353b]">Know your government</h3><p className="mt-2 text-[13px] leading-relaxed text-[#777c84]">The cabinet, departments and the IAS · IPS · IFS officers who run all 38 districts — graded on every promise.</p><div className="mt-6 flex items-center gap-4"><div className="flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-[#e9ecef] text-center"><span><b className="block text-2xl text-[#e52d2d]">D</b><small className="text-[9px] text-[#858993]">Report card</small></span></div><span className="text-[12px] text-[#777c84]">0 of 24 promises delivered</span></div><Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-[#b18413]">Explore government & scorecard <ArrowRight className="h-4 w-4" /></Link></div>{modules.map(({ title, detail, icon: Icon, tone }) => <Link key={title} href="/dashboard" className="flex min-h-[78px] items-center gap-3 rounded-xl border border-[#e6e7ea] bg-white px-3 shadow-sm transition-transform hover:-translate-y-0.5"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-${tone}-50 text-${tone}-600`}><Icon className="h-4 w-4" /></span><span><b className="block text-[13px] text-[#393a40]">{title}</b><small className="mt-1 block text-[11px] text-[#858992]">{detail}</small></span></Link>)}</div><div className="mt-5 flex justify-center"><Link href="/dashboard"><Button variant="outline" className="bg-white">See all modules <ArrowRight className="h-4 w-4" /></Button></Link></div></div></section>
}

function HomeFooter() {
  return <footer className="relative overflow-hidden border-t border-[#e8e8e9] bg-white px-5 py-12 sm:px-8"><div className="pointer-events-none absolute inset-0 bg-[url('/assets/heritage-arches.svg')] bg-[length:720px_auto] bg-[right_bottom] bg-no-repeat opacity-[0.08]" /><div className="relative mx-auto max-w-[1050px]"><div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]"><div><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#a40000] text-white"><MapPin className="h-5 w-5 fill-[#f5c400]" /></span><span className="leading-none"><b className="block text-[14px] text-[#28292e]">NammaTN</b><b className="block pt-0.5 text-[12px] text-[#a40000]">நம்ம தமிழ்நாடு</b></span></div><p className="mt-5 max-w-[290px] text-[13px] leading-relaxed text-[#737780]">An open civic platform for transparency and participation in Tamil Nadu.</p><p className="mt-3 text-[14px] font-semibold text-[#45464c]">நம் ஊர் நம் பொறுப்பு <span className="font-normal text-[#898c94]">— Our town is our responsibility</span></p></div><FooterColumn title="Report & track" links={["Report an issue", "Issues board", "Makkal Arangam"]} /><FooterColumn title="Transparency" links={["Budget & spending", "Commitments & delivery"]} /><FooterColumn title="Explore" links={["Government", "Tamil Nadu", "Health & hospitals", "Heritage & history", "Open Data"]} /></div><div className="mt-10 flex flex-wrap justify-center gap-2 border-t border-[#ececee] pt-5 text-[11px] text-[#777b83]"><span>◉ <b className="text-[#bd3c3a]">1,415</b> visitors</span><span>·</span><span>Built for civic transparency</span><span>·</span><span>Open data</span><span>·</span><span>Share feedback</span><span>·</span><span>Developed by Withso Technologies</span></div></div></footer>
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return <div><h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#393a40]">{title}</h3><div className="mt-4 space-y-2.5">{links.map((link) => <Link key={link} href="/dashboard" className="block text-[13px] text-[#636771] hover:text-[#a40000]">{link}</Link>)}</div></div>
}

export default function HomePage() {
  const { isRTL } = useLanguage()
  const [activeIssue, setActiveIssue] = useState("Roads")
  return <div className={`bg-white text-[#60646e] ${isRTL ? "rtl" : "ltr"}`}><SiteHeader /><main><section className="relative overflow-hidden bg-[#fcfbf8] px-5 pb-14 pt-12 sm:px-8 sm:pt-16"><div className="absolute inset-0 bg-[url('/assets/heritage-arches.svg')] bg-[length:900px_auto] bg-[right_20%] bg-no-repeat opacity-[0.13]" /><div className="relative mx-auto grid max-w-[1150px] items-center gap-8 lg:grid-cols-[1fr_0.9fr]"><div className="motion-safe-fade-in"><div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#bd2d27]"><span className="h-2 w-2 rounded-full bg-[#f1c400]" /> Tamil Nadu · citizen platform</div><p className="mt-5 border-l-2 border-[#edcaca] pl-3 text-[15px] font-bold text-[#b02b24]">யாதும் ஊரே — யாவரும் கேளிர் <span className="mt-1 block text-[11px] font-normal italic text-[#95979c]">“All towns are our own — all people are our kin”</span></p><h1 className="mt-6 max-w-[570px] text-[44px] font-bold leading-[1.03] tracking-[-0.055em] text-[#25262b] sm:text-[58px]">Report a civic issue.<br /><span className="text-[#b02d1f]">Track it to a fix.</span></h1><p className="mt-5 max-w-[550px] text-[17px] leading-relaxed text-[#777b85]">Raise the problems you face, let your neighbours verify them, and track community-confirmed fixes in the open.</p><div className="mt-6 flex items-center gap-2 text-[13px] font-bold text-[#36373d]"><Megaphone className="h-4 w-4 text-[#b72b23]" /> What would you like to report?</div><div className="mt-3 flex max-w-[520px] flex-wrap gap-2">{issueChips.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => setActiveIssue(label)} className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors ${activeIssue === label ? "border-[#b72b23] bg-[#fff0ed] text-[#a92a22]" : "border-[#d9dadd] bg-white text-[#676b74] hover:border-[#b72b23]"}`}><Icon className="h-3.5 w-3.5" /> {label}</button>)}<button className="flex items-center gap-1 rounded-full border border-dashed border-[#cfd1d5] px-3 py-1.5 text-[12px] font-semibold text-[#737780]"><MoreHorizontal className="h-3.5 w-3.5" /> more</button></div><div className="mt-5 flex flex-wrap gap-3"><Link href="/report"><Button className="h-11 bg-[#a40000] px-5 text-white hover:bg-[#850000]"><Megaphone className="h-4 w-4" /> Report an issue</Button></Link><Link href="/projects"><Button variant="outline" className="h-11 border-[#d5d7da] bg-white px-5 text-[#3b3c43]">⌕ &nbsp;Track a report</Button></Link></div><div className="mt-4 flex items-center gap-2 text-[12px] text-[#92959c]"><CircleDot className="h-4 w-4 text-[#35a96c]" /> No account needed to explore · <b className="text-[#555861]">70</b> reported · <b className="text-[#555861]">1</b> resolved</div></div><div className="relative flex flex-col items-center"><div className="mb-3 flex items-center gap-2 rounded-full border border-[#e4e5e7] bg-white px-4 py-2 text-[11px] font-semibold shadow-sm"><span className="h-2 w-2 rounded-full bg-[#19a563]" /> <span className="text-[#1e9c5c]">Live issues</span><span className="text-[#a8abb0]">|</span><Landmark className="h-3.5 w-3.5 text-[#8a8d94]" /> Heritage · மாமர</div><TamilNaduMap /><div className="flex items-center gap-2 text-[12px] text-[#737780]"><span className="h-2 w-2 rounded-full bg-[#1ca966]" /> <b className="text-[#1ca966]">LIVE</b> <Siren className="h-3.5 w-3.5 text-[#b17b36]" /> Disturbance of dogs · Chengalpattu · 2d</div></div></div></section><div className="border-y border-[#ececee] bg-white px-5 py-5"><div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12px] text-[#777b84]"><b className="uppercase tracking-[0.08em] text-[#bb322b]">Powering every report</b><span><Building2 className="mr-1 inline h-3.5 w-3.5" /> <b>43</b> departments</span><span><MapPin className="mr-1 inline h-3.5 w-3.5" /> <b>38</b> districts</span><span><Scale className="mr-1 inline h-3.5 w-3.5" /> <b>234</b> constituencies</span><span><HeartPulse className="mr-1 inline h-3.5 w-3.5" /> <b>993</b> hospitals</span><span><Leaf className="mr-1 inline h-3.5 w-3.5" /> <b>35</b> schemes</span><span><Landmark className="mr-1 inline h-3.5 w-3.5" /> <b>93</b> heritage sites</span></div></div><TrackingSection /><ExploreSection /><section className="bg-white px-5 py-16 sm:px-8"><div className="mx-auto max-w-[985px] overflow-hidden rounded-2xl bg-[#512017] shadow-sm"><div className="relative min-h-[300px] overflow-hidden"><img src="/assets/1.jpeg" alt="Civic participation" className="absolute inset-0 h-full w-full object-cover opacity-35" /><div className="absolute inset-0 bg-[#3d150f]/75" /><div className="relative flex min-h-[300px] flex-col items-center justify-center px-5 text-center text-white"><p className="text-[14px] font-semibold">உங்கள் குரல் கேட்கப்படும்</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-[36px]">Ready to make your voice heard?</h2><p className="mt-3 max-w-[550px] text-[15px] text-white/80">Join the <b className="text-[#f1c400]">1,415</b> citizens exploring NammaTN — report, verify and hold Tamil Nadu's government accountable.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/register"><Button className="bg-[#a40000] text-white hover:bg-[#850000]">Create free account</Button></Link><Link href="/login"><Button variant="outline" className="border-white/60 bg-transparent text-white hover:bg-white hover:text-[#512017]">Sign in</Button></Link></div></div></div></div></section></main><HomeFooter /></div>
}
