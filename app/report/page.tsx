"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowUpFromLine,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Bus,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  CloudRain,
  Droplets,
  FileText,
  Flag,
  HeartPulse,
  Landmark,
  Leaf,
  Lightbulb,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  PackageOpen,
  PawPrint,
  PlugZap,
  Radio,
  Route,
  Settings2,
  Shield,
  Siren,
  Store,
  TrafficCone,
  Trash2,
  Upload,
  Waves,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/components/language-context"

type Category = {
  value: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  tone: string
}

const categories: Category[] = [
  { value: "roads", label: "Roads & Potholes", icon: TrafficCone, tone: "text-red-500" },
  { value: "streetlights", label: "Street Lights", icon: Lightbulb, tone: "text-amber-600" },
  { value: "water", label: "Water Supply", icon: Droplets, tone: "text-teal-600" },
  { value: "electricity", label: "Electricity / Power", icon: PlugZap, tone: "text-orange-500" },
  { value: "drainage", label: "Drainage & Sewage", icon: Waves, tone: "text-cyan-600" },
  { value: "garbage", label: "Garbage & Sanitation", icon: Trash2, tone: "text-red-500" },
  { value: "health", label: "Public Health", icon: HeartPulse, tone: "text-rose-500" },
  { value: "transport", label: "Public Transport", icon: Bus, tone: "text-emerald-600" },
  { value: "ration", label: "Ration / PDS", icon: Store, tone: "text-pink-500" },
  { value: "education", label: "Schools & Education", icon: BookOpen, tone: "text-sky-600" },
  { value: "land", label: "Land & Revenue\nRecords", icon: Landmark, tone: "text-orange-600" },
  { value: "pollution", label: "Pollution &\nEnvironment", icon: Leaf, tone: "text-emerald-600" },
  { value: "corruption", label: "Corruption / Bribery", icon: AlertTriangle, tone: "text-red-500" },
  { value: "safety", label: "Women & Child Safety", icon: Shield, tone: "text-rose-400" },
  { value: "animals", label: "Stray Animals &\nMenace", icon: PawPrint, tone: "text-orange-700" },
  { value: "encroachment", label: "Encroachment &\nIllegal Construction", icon: Building2, tone: "text-amber-600" },
  { value: "hazards", label: "Public Safety &\nHazards", icon: Siren, tone: "text-orange-500" },
  { value: "crime", label: "Crime Reporting", icon: FileText, tone: "text-slate-500" },
  { value: "heritage", label: "Heritage &\nMonuments", icon: Landmark, tone: "text-amber-700" },
  { value: "bridges", label: "Bridges & Flyovers", icon: Route, tone: "text-orange-700" },
]

const exploreLinks = [
  { label: "Overview", icon: Radio },
  { label: "Government", icon: Building2 },
  { label: "Commitments & delivery", icon: Flag },
  { label: "Budget & spending", icon: BarChart3 },
  { label: "Industries & investment", icon: Store },
  { label: "Makkal Arangam", icon: CircleUserRound },
  { label: "Hospitals", icon: HeartPulse },
  { label: "Police", icon: Shield },
  { label: "Water Bodies & Dams", icon: CloudRain },
  { label: "Roads & Highways", icon: Route },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#fbfbfc] text-[#656a75]">
      <Link href="/" onClick={onNavigate} className="flex h-[62px] items-center gap-3 border-b border-[#ececf0] px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a40000] text-white shadow-sm">
          <MapPin className="h-5 w-5 fill-[#f5c400]" />
        </span>
        <span className="leading-none">
          <span className="block text-[14px] font-bold tracking-[-0.03em] text-[#24252a]">NammaTN</span>
          <span className="block pt-1 text-[13px] font-bold text-[#b00000]">நம்ம தமிழ்நாடு</span>
        </span>
      </Link>

      <div className="flex-1 overflow-y-auto px-3 py-6">
        <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898c95]">For you</p>
        <Link href="/" onClick={onNavigate} className="report-nav-item"><Building2 className="h-[17px] w-[17px]" /> Home</Link>
        <Link href="/report" onClick={onNavigate} className="report-nav-item report-nav-active"><TrafficCone className="h-[17px] w-[17px]" /> Report an issue</Link>
        <Link href="/issues" onClick={onNavigate} className="report-nav-item"><MessageCircle className="h-[17px] w-[17px]" /> Issues board & map</Link>

        <p className="px-2 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898c95]">Explore</p>
        {exploreLinks.map(({ label, icon: Icon }) => (
          <Link key={label} href="/dashboard" onClick={onNavigate} className="report-nav-item"><Icon className="h-[17px] w-[17px]" /> <span>{label}</span></Link>
        ))}
      </div>

      <div className="border-t border-[#ececf0] px-3 pb-3 pt-2">
        <Link href="/report" onClick={onNavigate} className="mb-2 flex h-9 items-center justify-center gap-2 rounded-lg bg-[#f1c400] text-[12px] font-bold text-[#272319] shadow-sm"><TrafficCone className="h-4 w-4" /> Report an issue</Link>
        <Link href="/login" onClick={onNavigate} className="flex h-7 items-center justify-center text-[12px] font-semibold text-[#b00000]">Sign in</Link>
        <div className="mt-1 flex items-center gap-2">
          <button className="flex h-8 flex-1 items-center justify-center gap-1 rounded-lg border border-[#e5e5ea] bg-white text-[12px] font-semibold text-[#777b83]"><span>🇮🇳</span> தமிழ் காண்க <ChevronDown className="h-3 w-3" /></button>
          <button aria-label="Display settings" className="flex h-8 w-9 items-center justify-center rounded-lg border border-[#e5e5ea] bg-white text-[#777b83]"><Settings2 className="h-4 w-4" /></button>
        </div>
        <button className="mt-4 w-full text-center text-[11px] text-[#8b8d94]">Share feedback</button>
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#858890]"><span className="text-[#e65d69]">◉</span><b className="text-[#c73b43]">1,415</b> visitors <span className="text-[#b3b4ba]">|</span> <PackageOpen className="h-3.5 w-3.5" /> Open Data</div>
        <div className="mt-2 flex justify-center gap-2 text-[10px] text-[#999ba1]"><span>Privacy</span><span>·</span><span>Terms</span><span>·</span><span>Disclaimer</span></div>
      </div>
    </div>
  )
}

export default function ReportPage() {
  const { isRTL } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("roads")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [photoName, setPhotoName] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#fafafa] px-5 py-16 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
        <h1 className="mt-5 text-3xl font-bold text-[#25262b]">Report submitted</h1>
        <p className="mt-2 text-[#757983]">Your anonymous report has been recorded for community verification.</p>
        <Button className="mt-7 bg-[#a40000] hover:bg-[#850000]" onClick={() => setIsSubmitted(false)}>Report another issue</Button>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-[#fafafa] text-[#676b76] ${isRTL ? "rtl" : "ltr"}`}>
      <div className="fixed inset-y-0 left-0 z-40 hidden w-[228px] border-r border-[#ececf0] lg:block"><SidebarContent /></div>

      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#ececf0] bg-[#fbfbfc] px-4 lg:hidden">
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu"><Menu className="h-5 w-5" /></Button></SheetTrigger>
          <SheetContent side="left" className="w-[228px] p-0"><SidebarContent onNavigate={() => setIsDrawerOpen(false)} /></SheetContent>
        </Sheet>
        <Link href="/" className="text-sm font-bold text-[#a40000]">NammaTN</Link>
        <Button variant="ghost" size="icon" aria-label="Notifications"><Bell className="h-4 w-4" /></Button>
      </div>

      <main className="lg:ml-[228px]">
        <div className="mx-auto max-w-[690px] px-5 pb-20 pt-8 sm:px-8 lg:pt-9">
          <header className="mb-5"><h1 className="text-[25px] font-bold leading-tight tracking-[-0.04em] text-[#27282e]">Report an issue</h1><p className="mt-1 text-[15px] text-[#8a8e98]">Choose what is wrong, add a photo and publish it for community verification.</p></header>

          <div className="mb-3 flex gap-3 border-l-[3px] border-[#f0bd00] bg-[#fff5d7] px-3 py-3 text-[12px] leading-[1.45] text-[#8d8878]"><Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#e2ae00]" /><p>NammaTN is an independent civic platform, not a government grievance portal. Reports are classified for public tracking and are not sent to or acknowledged by any department, Minister, MLA or their offices.</p></div>
          <div className="mb-4 rounded-xl border border-[#f3db72] bg-[#fffdf2] px-4 py-3 text-[13px] text-[#bd761d]"><div className="flex items-center gap-2 font-bold"><CircleUserRound className="h-4 w-4" /> You're not signed in — your report will be anonymous.</div><p className="pl-6 pt-1 text-[12px]">Anonymous reports count but can't be followed up. <Link href="/login" className="font-semibold text-[#bd2f20]">Sign in to track your report.</Link></p></div>

          <section className="rounded-xl border border-[#e6e6ea] bg-white p-5 shadow-[0_2px_8px_rgba(30,30,30,0.04)] sm:p-[21px]">
            <div className="mb-3 text-[13px] font-semibold text-[#777b84]">What's the problem? <span className="text-[#bf1e21]">*</span></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon
                const selected = category.value === selectedCategory
                return <button key={category.value} type="button" onClick={() => setSelectedCategory(category.value)} className={`flex min-h-[66px] flex-col items-center justify-center gap-2 rounded-xl border px-2 py-2 text-center text-[12px] font-semibold leading-[1.2] transition-colors ${selected ? "border-[#d39d00] bg-[#ffe0df] text-[#bd2a22] shadow-[inset_0_0_0_1px_#d39d00]" : "border-[#e2e3e7] bg-white text-[#727680] hover:border-[#d7ae31] hover:bg-[#fffaf0]"}`}><Icon className={`h-[17px] w-[17px] ${selected ? "text-[#b91f23]" : category.tone}`} />{category.label.split("\n").map((line) => <span key={line}>{line}</span>)}</button>
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="rounded-xl border border-[#e6e7ea] bg-[#fafafa] p-3"><div className="flex items-start justify-between gap-4 text-[12px] text-[#777b84]"><div><p className="font-medium">Public classification: <b className="text-[#303239]">Highways and Minor Ports Department</b></p><p className="mt-1 text-[11px]">This helps route the issue for public reference. NammaTN does not send it to either office.</p></div><button type="button" onClick={() => setSelectedCategory("")} className="shrink-0 font-semibold text-[#c3342c]">Change</button></div><label className="mt-3 block text-[12px] text-[#8a8d96]">Type of road <span className="text-[11px]">optional</span></label><select className="report-field mt-1" defaultValue=""><option value="">Select road type</option><option>National highway</option><option>State highway</option><option>Town street</option></select><p className="mt-1 text-[11px] text-[#92959c]">Helps classify the report for public reference.</p><label className="mt-3 block text-[12px] text-[#8a8d96]">Type of damage <span className="text-[11px]">optional</span></label><select className="report-field mt-1" defaultValue=""><option value="">Select damage type</option><option>Pothole</option><option>Broken pavement</option><option>Waterlogging</option></select></div>
              <div><label htmlFor="title" className="text-[12px] text-[#8a8d96]">Title <span className="text-[11px]">optional — we'll add one if you skip it</span></label><input id="title" className="report-field mt-1" placeholder="e.g. Large pothole on Anna Salai near bus stop" /></div>
              <button type="button" onClick={() => setShowDetails(!showDetails)} className="text-[12px] font-bold text-[#c32920]">{showDetails ? "▾ Hide details" : "▸ Add more details — description, area, severity"}</button>
              {showDetails && <textarea className="report-field min-h-24 resize-y" placeholder="Describe what happened and how severe it is." />}
              <div><label className="text-[12px] font-semibold text-[#777b84]">Where is it? <span className="text-[#bf1e21]">*</span></label><p className="mt-1 text-[11px] text-[#92959c]">Share your location to auto-detect your district / constituency, or pick your constituency below.</p><div className="mt-3 flex flex-wrap items-center gap-3"><Button type="button" variant="outline" className="h-10 border-[#dfe0e4] bg-white text-[12px] font-medium text-[#4a4d55]"><Navigation className="h-4 w-4" /> Use my current location</Button><button type="button" className="flex items-center gap-1 text-[13px] font-medium text-[#c52e2a]"><MapPin className="h-4 w-4" /> Pick / adjust on map</button></div></div>
              <div><label htmlFor="constituency" className="text-[12px] font-semibold text-[#777b84]">Assembly constituency <span className="text-[#bf1e21]">*</span></label><select id="constituency" className="report-field mt-1" defaultValue=""><option value="">— Select your constituency —</option><option>Chepauk-Thiruvallikeni</option><option>Anna Nagar</option><option>Velachery</option></select></div>
              <div><label className="text-[12px] text-[#8a8d96]">Photo <span className="text-[11px]">optional · JPEG / PNG / WebP / GIF · max 10 MB</span></label><button type="button" onClick={() => fileInputRef.current?.click()} className="mt-1 flex h-11 w-full items-center gap-2 rounded-lg border border-dashed border-[#d6d7db] px-4 text-left text-[13px] text-[#9a9da5]"><Upload className="h-4 w-4" />{photoName || "Choose a photo"}</button><input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => setPhotoName(event.target.files?.[0]?.name || "")} /></div>
              <div className="flex items-center justify-between gap-4 pt-3"><Link href="/issues" className="text-[13px] font-medium text-[#c52e2a]">View all issues</Link><Button type="submit" className="h-10 bg-[#bd7773] px-5 text-[13px] text-white hover:bg-[#a85e5a]"><ArrowUpFromLine className="h-4 w-4" /> Submit anonymously</Button></div>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}
