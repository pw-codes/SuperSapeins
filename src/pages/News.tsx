import {useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import {Bookmark} from 'lucide-react'
import {news,athletes,SPORTS} from '../data/mock'
import {useStore} from '../store'
import {Btn,Card} from '../components/ui'
export function NewsCard({n}:{n:typeof news[number]}){const{s,toggle,toast}=useStore();const b=s.marks.includes(n.id)
return <Card className="overflow-hidden"><Link to={`/app/news/${n.id}`}><div className="h-36 bg-gradient-to-br from-lime/25 to-bg2"/>{/* IMAGE SLOT */}</Link><div className="p-4"><p className="text-xs text-lime">{n.cat}</p><Link to={`/app/news/${n.id}`} className="mt-1 block font-bold hover:text-lime">{n.title}</Link><p className="mt-1 text-sm text-mute">{n.desc}</p><div className="mt-3 flex items-center justify-between text-xs text-mute"><span>{n.source} · {n.date} · {n.mins} min</span><button aria-label="Bookmark" aria-pressed={b} onClick={()=>{toggle('marks',n.id);toast(b?'Bookmark removed':'Article saved')}}><Bookmark size={16} className={b?'fill-lime text-lime':''}/></button></div></div></Card>}
export function News(){const[c,setC]=useState('');const l=news.filter(n=>!c||n.cat===c);const f=news[0]
return <div><h1 className="text-3xl font-extrabold">Sports news</h1><p className="text-xs text-mute">Demonstration content, not real reporting.</p>
<Link to={`/app/news/${f.id}`} className="mt-6 block rounded-2xl border border-line bg-gradient-to-br from-lime/20 to-card p-8 md:p-12"><p className="text-xs text-lime">Featured · {f.cat}</p><h2 className="mt-2 max-w-2xl text-2xl font-extrabold md:text-4xl">{f.title}</h2><p className="mt-2 text-mute">{f.desc}</p></Link>
<div className="mt-6 flex gap-2 overflow-x-auto">{['',...SPORTS].map(x=><button key={x} onClick={()=>setC(x)} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${c===x?'border-lime bg-lime text-bg':'border-line text-mute'}`}>{x||'All'}</button>)}</div>
<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{l.map(n=><NewsCard key={n.id} n={n}/>)}</div>{!l.length&&<p className="mt-8 text-center text-mute">No stories in this category yet.</p>}</div>}
export function Article(){const{id}=useParams();const n=news.find(x=>x.id===id);const{s,toggle,toast}=useStore()
if(!n)return <div className="py-20 text-center"><p className="font-bold">Article not found</p><Link to="/app/news" className="text-lime">Back to news</Link></div>
const a=athletes.find(x=>x.id===n.athleteId)!;const b=s.marks.includes(n.id)
return <article className="mx-auto max-w-3xl"><div className="h-56 rounded-2xl bg-gradient-to-br from-lime/25 to-bg2 md:h-72"/><p className="mt-6 text-xs text-lime">{n.cat} · demonstration content</p><h1 className="mt-2 text-3xl font-extrabold md:text-5xl">{n.title}</h1><p className="mt-2 text-sm text-mute">By {n.source} · {n.date} · {n.mins} min read</p>
<div className="mt-4 flex gap-2"><Btn v="ghost" onClick={()=>{toggle('marks',n.id);toast(b?'Bookmark removed':'Article saved')}}>{b?'Saved':'Save'}</Btn><Btn v="ghost" onClick={()=>{navigator.clipboard?.writeText(location.href);toast('Link copied')}}>Share</Btn></div>
{[1,2,3].map(i=><p key={i} className="mt-5 text-mute">This is placeholder article text for the ATHLETIX prototype. It describes no real events, results or people, and exists to show layout, spacing and reading comfort.</p>)}
<h2 className="mt-10 font-bold">Related athlete</h2><Link to={`/app/athletes/${a.id}`} className="mt-2 inline-block text-lime">{a.name}</Link>
<h2 className="mt-8 font-bold">Related stories</h2><div className="mt-2 space-y-2">{news.filter(x=>x.id!==n.id&&x.cat===n.cat||x.id==='n2').slice(0,3).map(x=><Link key={x.id} to={`/app/news/${x.id}`} className="block text-sm text-mute hover:text-lime">{x.title}</Link>)}</div></article>}
