"use client"

import type React from "react"
import { useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  CircleDot,
  CloudRain,
  Filter,
  Flag,
  HeartPulse,
  Layers,
  Landmark,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Navigation,
  PackageOpen,
  Plus,
  Radio,
  Route,
  Search,
  Settings2,
  Shield,
  Siren,
  Store,
  Tag,
  Trash2,
  TrafficCone,
  Users,
  Waves,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type Issue = {
  id: string
  title: string
  category: string
  department: string
  district: string
  address: string
  status: "Unverified" | "Verified" | "Fix reported" | "Resolved" | "Disputed"
  severity: "Low" | "Medium" | "High" | "Critical"
  time: string
  confirmations: number
  marker: [number, number]
}

const issues: Issue[] = [
  { id: "ISS-070", title: "Door to door collection not done", category: "Garbage & Sanitation", department: "Rural Development and Panchayat Raj", district: "Thiruvallur", address: "Thiruninravur (tp), Avadi, Thiruvallur", status: "Unverified", severity: "Medium", time: "7h ago", confirmations: 0, marker: [69, 30] },
  { id: "ISS-069", title: "Garbage & Sanitation", category: "Garbage & Sanitation", department: "Rural Development and Panchayat Raj", district: "Sivaganga", address: "Ward 14, Sivaganga, Sivaganga", status: "Unverified", severity: "Medium", time: "1d ago", confirmations: 0, marker: [48, 74] },
  { id: "ISS-068", title: "Streetlight not working near school", category: "Roads & Potholes", department: "Highways and Minor Ports Department", district: "Chennai", address: "Anna Salai, Teynampet, Chennai", status: "Unverified", severity: "Critical", time: "2d ago", confirmations: 1, marker: [61, 39] },
  { id: "ISS-067", title: "Potholes after monsoon rain", category: "Roads & Potholes", department: "Highways and Minor Ports Department", district: "Chengalpattu", address: "GST Road, Chengalpattu", status: "Verified", severity: "High", time: "2d ago", confirmations: 3, marker: [65, 48] },
  { id: "ISS-066", title: "Water supply interrupted", category: "Water Supply", department: "Water Resources Department", district: "Coimbatore", address: "Gandhipuram, Coimbatore", status: "Fix reported", severity: "Medium", time: "3d ago", confirmations: 3, marker: [31, 70] },
  { id: "ISS-065", title: "Broken footpath near hospital", category: "Roads & Potholes", department: "Municipal Administration", district: "Madurai", address: "KK Nagar, Madurai", status: "Resolved", severity: "Low", time: "4d ago", confirmations: 4, marker: [42, 77] },
]

const categoryFilters = [
  { label: "All", count: 70, icon: Filter },
  { label: "Roads & Potholes", count: 20, icon: TrafficCone },
  { label: "Electricity / Power", count: 8, icon: Zap },
  { label: "Garbage & Sanitation", count: 6, icon: Trash2 },
  { label: "Water Supply", count: 5, icon: Waves },
]

const exploreLinks = [
  ["Overview", Radio], ["Government", Building2], ["Commitments & delivery", Flag], ["Budget & spending", BarChart3], ["Industries & investment", Store], ["Makkal Arangam", Users], ["Hospitals", HeartPulse], ["Police", Shield], ["Water Bodies & Dams", CloudRain], ["Roads & Highways", Route],
] as const

function CivicSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return <div className="flex h-full flex-col bg-[#fbfbfc] text-[#656a75]"><Link href="/" onClick={onNavigate} className="flex h-[62px] items-center gap-3 border-b border-[#ececf0] px-5"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a40000] text-white"><MapPin className="h-5 w-5 fill-[#f5c400]" /></span><span className="leading-none"><b className="block text-[14px] text-[#24252a]">NammaTN</b><b className="block pt-1 text-[13px] text-[#b00000]">நம்ம தமிழ்நாடு</b></span></Link><div className="flex-1 overflow-y-auto px-3 py-6"><p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898c95]">For you</p><Link href="/" onClick={onNavigate} className="issues-nav-item"><Building2 className="h-[17px] w-[17px]" /> Home</Link><Link href="/report" onClick={onNavigate} className="issues-nav-item"><TrafficCone className="h-[17px] w-[17px]" /> Report an issue</Link><Link href="/issues" onClick={onNavigate} className="issues-nav-item issues-nav-active"><MessageCircle className="h-[17px] w-[17px]" /> Issues board & map</Link><p className="px-2 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898c95]">Explore</p>{exploreLinks.map(([label, Icon]) => <Link key={label} href="/dashboard" onClick={onNavigate} className="issues-nav-item"><Icon className="h-[17px] w-[17px]" /> <span>{label}</span></Link>)}</div><div className="border-t border-[#ececf0] px-3 pb-3 pt-2"><Link href="/report" onClick={onNavigate} className="mb-2 flex h-9 items-center justify-center gap-2 rounded-lg bg-[#f1c400] text-[12px] font-bold text-[#272319]"><TrafficCone className="h-4 w-4" /> Report an issue</Link><Link href="/login" onClick={onNavigate} className="flex h-7 items-center justify-center text-[12px] font-semibold text-[#b00000]">Sign in</Link><div className="mt-1 flex items-center gap-2"><button className="flex h-8 flex-1 items-center justify-center gap-1 rounded-lg border border-[#e5e5ea] bg-white text-[12px] font-semibold text-[#777b83]">🇮🇳 தமிழ் காண்க <ChevronDown className="h-3 w-3" /></button><button aria-label="Display settings" className="flex h-8 w-9 items-center justify-center rounded-lg border border-[#e5e5ea] bg-white text-[#777b83]"><Settings2 className="h-4 w-4" /></button></div><button className="mt-4 w-full text-center text-[11px] text-[#8b8d94]">Share feedback</button><div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#858890]"><span className="text-[#e65d69]">◉</span><b className="text-[#c73b43]">1,415</b> visitors <span>|</span> <PackageOpen className="h-3.5 w-3.5" /> Open Data</div><div className="mt-2 flex justify-center gap-2 text-[10px] text-[#999ba1]">Privacy · Terms · Disclaimer</div></div></div>
}

function MapPanel({ visibleIssues, selectedIssue, setSelectedIssue, layersOpen, setLayersOpen, zoom, setZoom }: { visibleIssues: Issue[]; selectedIssue: string | null; setSelectedIssue: (id: string) => void; layersOpen: boolean; setLayersOpen: (open: boolean) => void; zoom: number; setZoom: React.Dispatch<React.SetStateAction<number>> }) {
  return <div className="relative h-[520px] overflow-hidden border-l border-[#ececf0] bg-[#fffdfb] lg:h-auto"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#fff9f2,transparent_58%)]" /><svg viewBox="0 0 350 520" className="absolute left-1/2 top-8 h-[455px] w-[315px] -translate-x-1/2" style={{ transform: `translateX(-50%) scale(${zoom / 100})` }} aria-label="Tamil Nadu issue map"><defs><pattern id="issue-districts" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 10L12 0 24 10 12 24z" fill="none" stroke="#d98b82" strokeWidth=".7" opacity=".5" /></pattern></defs><path d="M169 9c27 10 53 14 66 33l-4 24 28 20-16 26 14 28-27 28 19 36-19 28 2 40-25 20 9 28-20 20-1 38-29 21-11 43-21 25-14 50-28-7-20-28-4-42-18-22 8-30-20-25 14-33-1-35 22-20-3-41 22-32-5-32 26-23 0-29 23-12z" fill="#fff9f5" stroke="#dd938b" strokeWidth="2" /><path d="M169 9c27 10 53 14 66 33l-4 24 28 20-16 26 14 28-27 28 19 36-19 28 2 40-25 20 9 28-20 20-1 38-29 21-11 43-21 25-14 50-28-7-20-28-4-42-18-22 8-30-20-25 14-33-1-35 22-20-3-41 22-32-5-32 26-23 0-29 23-12z" fill="url(#issue-districts)" /></svg>{visibleIssues.map((issue) => <button key={issue.id} type="button" onClick={() => setSelectedIssue(issue.id)} className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 border-white text-[11px] font-bold text-white shadow ${selectedIssue === issue.id ? "bg-[#a40000] ring-2 ring-[#f1c400]" : "bg-[#777e82]"}`} style={{ left: `${issue.marker[0]}%`, top: `${issue.marker[1]}%` }} aria-label={`Show ${issue.title}`}>{issue.category === "Garbage & Sanitation" ? <Trash2 className="h-3.5 w-3.5" /> : <CircleDot className="h-3.5 w-3.5" />}</button>)}<div className="absolute left-3 top-3 rounded-full border border-[#ebebed] bg-white px-3 py-2 text-[12px] font-semibold text-[#62666f] shadow-sm"><MapPin className="mr-1 inline h-3.5 w-3.5 text-[#bd2f2a]" /> 70 on the map</div><div className="absolute right-3 top-3"><button onClick={() => setLayersOpen(!layersOpen)} className="rounded-full border border-[#e5e5e7] bg-white px-3 py-2 text-[12px] font-semibold text-[#666a72] shadow-sm"><Layers className="mr-1 inline h-3.5 w-3.5" /> Layers <ChevronDown className="ml-1 inline h-3 w-3" /></button>{layersOpen && <div className="mt-2 w-36 rounded-xl border border-[#e6e7e9] bg-white p-2 text-[12px] shadow-lg"><label className="flex gap-2 p-2"><input type="checkbox" defaultChecked /> Issues</label><label className="flex gap-2 p-2"><input type="checkbox" defaultChecked /> Districts</label><label className="flex gap-2 p-2"><input type="checkbox" /> Departments</label></div>}</div><div className="absolute bottom-16 left-3 rounded-xl border border-[#e6e7e9] bg-white px-3 py-2 text-[11px] text-[#767a82] shadow-sm"><b className="text-[#36383e]">Legend</b> <ChevronDown className="ml-2 inline h-3 w-3" /></div><div className="absolute bottom-4 right-3 flex flex-col overflow-hidden rounded-xl border border-[#e6e7e9] bg-white shadow-sm"><button aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(120, value + 10))} className="flex h-9 w-9 items-center justify-center border-b text-[#737780]"><Plus className="h-4 w-4" /></button><button aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(90, value - 10))} className="flex h-9 w-9 items-center justify-center text-[#737780]"><Minus className="h-4 w-4" /></button></div><div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-[#e0a900]">Leaflet</div></div>
}

function IssueCard({ issue, onVerify, selected, onSelect }: { issue: Issue; onVerify: (id: string) => void; selected: boolean; onSelect: () => void }) {
  const statusStyle = issue.status === "Unverified" ? "bg-[#9b5700] text-white" : issue.status === "Verified" ? "bg-[#0a968b] text-white" : issue.status === "Resolved" ? "bg-[#159947] text-white" : "bg-[#c17611] text-white"
  const severityStyle = issue.severity === "Critical" ? "border-[#ef443f] text-[#d62f2c]" : issue.severity === "High" ? "border-[#e58b38] text-[#b76a12]" : "border-[#d99a61] text-[#a96520]"
  return <article onClick={onSelect} className={`cursor-pointer rounded-2xl border bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,.04)] transition-shadow hover:shadow-md ${selected ? "border-[#b72b25] ring-1 ring-[#b72b25]/20" : "border-[#e5e6e8]"}`}><div className="flex gap-3"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle}`}>● &nbsp;{issue.status}</span><span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${severityStyle}`}>{issue.severity}</span><span className="ml-auto text-[11px] text-[#90939a]">{issue.time}</span></div><h3 className="mt-2 text-[15px] font-bold text-[#36373d]">{issue.title}</h3><div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#83868e]"><span className="font-semibold text-[#b6302b]">▣ {issue.category}</span><span>▦ {issue.department}</span></div><p className="mt-2 text-[11px] text-[#8b8e96]"><MapPin className="mr-1 inline h-3 w-3" />{issue.address}</p></div><div className="w-[126px] shrink-0 border-l border-[#f0f0f1] pl-3 text-right"><p className="text-[10px] font-bold uppercase text-[#b16a20]">{issue.status === "Unverified" ? "Needs verification" : issue.status}</p><p className="mt-2 text-[11px] text-[#999ca3]">{issue.confirmations}/3 confirmations</p><div className="mt-1 text-[13px] text-[#1d9a51]">✓ <span className="text-[#b2b4b9]">○ × ○</span></div>{issue.status === "Unverified" && <button type="button" onClick={(event) => { event.stopPropagation(); onVerify(issue.id) }} className="mt-2 text-[12px] font-bold text-[#b52b26]">{issue.confirmations >= 3 ? "Verified" : "Help verify →"}</button>}</div></div></article>
}

export default function IssuesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [district, setDistrict] = useState("All districts")
  const [severity, setSeverity] = useState("All severity")
  const [sort, setSort] = useState("Most recent")
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [verified, setVerified] = useState<Record<string, number>>({})
  const [mobileView, setMobileView] = useState<"issues" | "map">("issues")
  const [layersOpen, setLayersOpen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const visibleIssues = useMemo(() => {
    const result = issues.map((issue) => ({ ...issue, confirmations: verified[issue.id] ?? issue.confirmations })).filter((issue) => {
      const query = search.toLowerCase()
      return (!query || `${issue.title} ${issue.category} ${issue.district}`.toLowerCase().includes(query)) && (category === "All" || issue.category === category) && (district === "All districts" || issue.district === district) && (severity === "All severity" || issue.severity === severity)
    })
    if (sort === "Needs verification") return result.sort((a, b) => a.confirmations - b.confirmations)
    if (sort === "Severity") return result.sort((a, b) => ["Critical", "High", "Medium", "Low"].indexOf(a.severity) - ["Critical", "High", "Medium", "Low"].indexOf(b.severity))
    return result
  }, [category, district, search, severity, sort, verified])

  const verifyIssue = (id: string) => setVerified((current) => ({ ...current, [id]: Math.min(3, (current[id] ?? issues.find((issue) => issue.id === id)?.confirmations ?? 0) + 1) }))

  return <div className="min-h-screen bg-[#fafafa] text-[#676b76]"><div className="fixed inset-y-0 left-0 z-40 hidden w-[228px] border-r border-[#ececf0] lg:block"><CivicSidebar /></div><div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#ececf0] bg-[#fbfbfc] px-4 lg:hidden"><Sheet open={drawerOpen} onOpenChange={setDrawerOpen}><SheetTrigger asChild><Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button></SheetTrigger><SheetContent side="left" className="w-[228px] p-0"><CivicSidebar onNavigate={() => setDrawerOpen(false)} /></SheetContent></Sheet><Link href="/" className="text-sm font-bold text-[#a40000]">NammaTN</Link><Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button></div><main className="lg:ml-[228px]"><div className="flex min-h-[calc(100vh-0px)] flex-col lg:flex-row"><section className={`w-full px-5 pb-8 pt-8 sm:px-8 lg:w-[638px] lg:shrink-0 lg:px-11 ${mobileView === "map" ? "hidden lg:block" : ""}`}><div className="flex items-start justify-between gap-4"><div><h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#292a30]">Citizen issues</h1><p className="mt-1 text-[12px] font-semibold text-[#b42c25]">குறைகள் கொளுத்துங்கள் · உணர மாற்றுங்கள்</p></div><Link href="/report"><Button className="h-9 shrink-0 bg-[#f1c400] px-4 text-[12px] font-bold text-[#292319] hover:bg-[#ddb300]"><TrafficCone className="h-4 w-4" /> Report an issue</Button></Link></div><div className="mt-3 flex gap-3 border-l-[3px] border-[#f0bd00] bg-[#fff5d7] px-3 py-3 text-[11px] leading-[1.45] text-[#8d8878]"><Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#e2ae00]" /><p>NammaTN is an independent civic platform, not a government grievance portal. Reports are classified for public tracking and are not sent to or acknowledged by any department, Minister, MLA or their offices.</p></div><div className="mt-3 rounded-xl border border-[#e6e7ea] bg-white px-3 py-2 text-[12px] text-[#7b7e86]">No account needed — you can report anonymously. <Link href="/login" className="font-bold text-[#bd2f25]">Sign in to track and follow up on your report.</Link></div><div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">{[["70", "Total", "#ffe0df"], ["57", "Unverified", "#fff"], ["10", "Verified", "#fff"], ["2", "Fix reported", "#fff"], ["1", "Resolved", "#fff"], ["0", "Disputed", "#fff"], ["1%", "Resolved rate", "#fff"]].map(([value, label, bg], index) => <div key={label} className={`rounded-xl border p-2 ${index === 0 ? "border-[#d34d46]" : "border-[#e5e6e8]"}`} style={{ backgroundColor: bg }}><b className={`block text-[20px] ${index === 0 ? "text-[#b72c25]" : "text-[#2e3036]"}`}>{value}</b><span className="block whitespace-nowrap text-[10px] text-[#82858d]">{label}</span></div>)}</div><div className="mt-3 flex gap-2 overflow-x-auto pb-1">{categoryFilters.map(({ label, count, icon: Icon }) => <button type="button" key={label} onClick={() => setCategory(label)} className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-[11px] font-semibold ${category === label ? "border-[#c83c35] bg-[#fff0ee] text-[#b72d26]" : "border-[#e5e6e8] bg-white text-[#7d8088]"}`}><Icon className="h-3.5 w-3.5" /> {label} <b>{count}</b></button>)}</div><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-[1.4fr_1fr_1fr_1fr]"><label className="relative col-span-2 sm:col-span-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9da0a7]" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="issues-field pl-9" placeholder="Search issues..." /></label><select value={district} onChange={(event) => setDistrict(event.target.value)} className="issues-field"><option>All districts</option><option>Chennai</option><option>Chengalpattu</option><option>Thiruvallur</option><option>Coimbatore</option><option>Madurai</option></select><select value={severity} onChange={(event) => setSeverity(event.target.value)} className="issues-field"><option>All severity</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select><select value={sort} onChange={(event) => setSort(event.target.value)} className="issues-field"><option>Most recent</option><option>Needs verification</option><option>Severity</option></select></div><div className="mt-3 flex items-center justify-between text-[11px] text-[#70747d]"><b>1–{visibleIssues.length} of 70 issues</b><button type="button" className="text-[#b52c25] lg:hidden" onClick={() => setMobileView("map")}><MapPin className="mr-1 inline h-3.5 w-3.5" /> View map</button></div><div className="mt-2 space-y-2.5">{visibleIssues.length ? visibleIssues.map((issue) => <IssueCard key={issue.id} issue={issue} selected={selectedIssue === issue.id} onSelect={() => { setSelectedIssue(issue.id); setMobileView("map") }} onVerify={verifyIssue} />) : <div className="rounded-2xl border border-dashed border-[#dfe0e2] bg-white p-8 text-center text-sm">No issues match these filters.</div>}</div></section><section className={`min-h-[620px] flex-1 ${mobileView === "issues" ? "hidden lg:block" : "block"}`}><MapPanel visibleIssues={visibleIssues} selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} layersOpen={layersOpen} setLayersOpen={setLayersOpen} zoom={zoom} setZoom={setZoom} /><div className="border-t border-[#ececf0] bg-white px-5 py-4"><div className="flex items-center gap-2 text-[14px] font-bold text-[#3b3c42]"><Siren className="h-4 w-4 text-[#c5312a]" /> Hotspots <span className="ml-auto text-[11px] font-normal text-[#95989f]">Districts with the most open issues</span></div>{[["Chennai", 16], ["Chengalpattu", 8], ["Thiruvallur", 5], ["Coimbatore", 4], ["Tuticorin", 4], ["Madurai", 4]].map(([name, count], index) => <div key={name} className="mt-3 flex items-center gap-3 text-[12px]"><b className="w-4 text-[#888b92]">{index + 1}</b><span className="w-28 font-semibold text-[#555860]">{name}</span><div className="h-1.5 flex-1 rounded-full bg-[#f1f2f3]"><div className="h-1.5 rounded-full bg-[#b00000]" style={{ width: `${Number(count) / 16 * 100}%` }} /></div><b className="w-5 text-right text-[#b00000]">{count}</b></div>)}</div></section></div></main></div>
}
