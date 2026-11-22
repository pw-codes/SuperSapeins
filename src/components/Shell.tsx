import {NavLink,Link,Outlet,useLocation,useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {LayoutDashboard,Search,TrendingUp,Newspaper,Eye,Users,Bookmark,User,Bell,Settings,ChevronLeft,ChevronRight} from 'lucide-react'
import {useStore} from '../store'
import {notifs} from '../data/mock'
const G:[string,[string,string,any][]][]=[['Overview',[['Dashboard','/app',LayoutDashboard],['Discover Athletes','/app/discover',Search],['Marketplace','/app/market',TrendingUp],['News','/app/news',Newspaper]]],['My Activity',[['Watchlist','/app/watchlist',Eye],['Following','/app/following',Users],['Saved Articles','/app/saved',Bookmark]]],['Personal',[['My Profile','/app/profile',User],['Notifications','/app/notifications',Bell],['Settings','/app/settings',Settings]]]]
export default function Shell(){const{s,set}=useStore();const loc=useLocation();const nav=useNavigate();const unread=notifs.filter(n=>!s.readN.includes(n.id)).length
const mobile=[...G[0][1],G[2][1][0]]
return <div className="flex min-h-screen">
<motion.aside animate={{width:s.collapsed?72:248}} className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-bg2 p-3 md:flex">
<Link to="/" className="mb-6 px-2 py-2 text-lg font-extrabold tracking-tight text-lime">{s.collapsed?'A':'ATHLETIX'}</Link>
<nav className="flex-1 space-y-5 overflow-y-auto">{G.map(([g,items])=><div key={g}>{!s.collapsed&&<p className="mb-1 px-2 text-xs text-mute">{g}</p>}{items.map(([l,to,Ic])=><NavLink key={to} to={to} end={to==='/app'} title={l} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${isActive?'bg-lime text-bg':'text-mute hover:bg-card hover:text-tx'}`}><Ic size={18}/>{!s.collapsed&&l}</NavLink>)}</div>)}</nav>
<button aria-label="Toggle sidebar" title="Toggle sidebar" onClick={()=>set({collapsed:!s.collapsed})} className="mt-2 flex justify-center rounded-xl py-2 text-mute hover:bg-card">{s.collapsed?<ChevronRight size={18}/>:<ChevronLeft size={18}/>}</button></motion.aside>
<div className="min-w-0 flex-1 pb-20 md:pb-0">
<header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur md:px-8">
<Link to="/" className="font-extrabold text-lime md:hidden">ATHLETIX</Link>
<form className="relative ml-auto max-w-md flex-1" onSubmit={e=>{e.preventDefault();const q=new FormData(e.currentTarget).get('q');nav(`/app/discover?q=${encodeURIComponent(String(q))}`)}}><Search size={16} className="absolute left-3 top-2.5 text-mute"/><input name="q" aria-label="Search athletes" placeholder="Search athletes" className="w-full pl-9"/></form>
<Link to="/app/notifications" aria-label="Notifications" className="relative rounded-full border border-line p-2"><Bell size={18}/>{unread>0&&<span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-lime text-[10px] font-bold text-bg">{unread}</span>}</Link>
<Link to="/app/profile" aria-label="Profile" className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-lime font-bold text-bg">{s.photo?<img src={s.photo} alt="" className="h-full w-full object-cover"/>:s.name[0]}</Link></header>
<motion.main key={loc.pathname} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="mx-auto max-w-7xl px-4 py-6 md:px-8"><Outlet/></motion.main></div>
<nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-line bg-bg2 py-2 md:hidden">{mobile.map(([l,to,Ic])=><NavLink key={to} to={to} end={to==='/app'} className={({isActive})=>`flex flex-col items-center gap-0.5 px-2 text-[10px] ${isActive?'text-lime':'text-mute'}`}><Ic size={20}/>{l.split(' ')[0]}</NavLink>)}</nav></div>}
