import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { news, athletes, SPORTS } from "../data/mock";
import { useStore } from "../store";
import { Btn, Card } from "../components/ui";
export function NewsCard({ n }: { n: (typeof news)[number] }) {
  const { s, toggle, toast } = useStore();
  const b = s.marks.includes(n.id);
  return (
    <Card className="overflow-hidden">
      <Link to={`/app/news/${n.id}`}>
        <div className="h-36 bg-gradient-to-br from-lime/25 to-bg2" />
      </Link>
      <div className="p-4">
        <p className="text-xs text-lime">{n.cat}</p>
        <Link
          to={`/app/news/${n.id}`}
          className="mt-1 block font-bold hover:text-lime"
        >
          {n.title}
        </Link>
        <p className="mt-1 text-sm text-mute">{n.desc}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-mute">
          <span>
            {n.source} · {n.date} · {n.mins} min
          </span>
          <button
            aria-label="Bookmark"
            aria-pressed={b}
            onClick={() => {
              toggle("marks", n.id);
              toast(b ? "Bookmark removed" : "Article saved");
            }}
          >
            <Bookmark size={16} className={b ? "fill-lime text-lime" : ""} />
          </button>
        </div>
      </div>
    </Card>
  );
}
export function News() {
  const [c, setC] = useState("");
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState<(typeof news)[number][]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("super-sapiens_custom_articles") || "[]",
      );
    } catch {
      return [];
    }
  });
  const allNews = [...custom, ...news];
  const l = allNews.filter((n) => !c || n.cat === c);
  const f = allNews[0];
  const add = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const v = Object.fromEntries(new FormData(ev.currentTarget)) as any;
    if (!v.title?.trim() || !v.body?.trim()) return;
    const article = {
      id: `n-custom-${Date.now()}`,
      title: v.title.trim(),
      cat: v.cat,
      desc: v.body.trim().slice(0, 140),
      source: "SUPER SAPIENS India Contributor",
      date: new Date().toISOString().slice(0, 10),
      mins: Math.max(1, Math.ceil(v.body.trim().split(/\s+/).length / 200)),
      athleteId: athletes[0].id,
      body: [v.body.trim()],
    };
    const next = [article, ...custom];
    setCustom(next);
    localStorage.setItem("super-sapiens_custom_articles", JSON.stringify(next));
    setOpen(false);
    ev.currentTarget.reset();
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Indian sports news</h1>
          <p className="text-xs text-mute">
            Fictional Indian demonstration content, not real reporting.
          </p>
        </div>
        <Btn onClick={() => setOpen(!open)}>
          {open ? "Close" : "Add article"}
        </Btn>
      </div>
      {open && (
        <form
          onSubmit={add}
          className="mt-6 grid gap-3 rounded-2xl border border-line bg-card p-5"
        >
          <input name="title" required placeholder="Article title" />
          <select name="cat">
            {SPORTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <textarea
            name="body"
            required
            rows={6}
            placeholder="Write your Indian sports article..."
          />
          <Btn className="justify-self-start">Publish locally</Btn>
        </form>
      )}
      <Link
        to={`/app/news/${f.id}`}
        className="mt-6 block rounded-2xl border border-line bg-gradient-to-br from-lime/20 to-card p-8 md:p-12"
      >
        <p className="text-xs text-lime">Featured · {f.cat}</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-extrabold md:text-4xl">
          {f.title}
        </h2>
        <p className="mt-2 text-mute">{f.desc}</p>
      </Link>
      <div className="mt-6">
        <select
          aria-label="Filter news category"
          value={c}
          onChange={(e) => setC(e.target.value)}
        >
          <option value="">All categories</option>
          {SPORTS.map((sport) => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {l.map((n) => (
          <NewsCard key={n.id} n={n} />
        ))}
      </div>
      {!l.length && (
        <p className="mt-8 text-center text-mute">
          No stories in this category yet.
        </p>
      )}
    </div>
  );
}
export function Article() {
  const { id } = useParams();
  let custom: (typeof news)[number][] = [];
  try {
    custom = JSON.parse(
      localStorage.getItem("super-sapiens_custom_articles") || "[]",
    );
  } catch {}
  const n = [...custom, ...news].find((x) => x.id === id);
  const { s, toggle, toast } = useStore();
  if (!n)
    return (
      <div className="py-20 text-center">
        <p className="font-bold">Article not found</p>
        <Link to="/app/news" className="text-lime">
          Back to Indian sports news
        </Link>
      </div>
    );
  const a = athletes.find((x) => x.id === n.athleteId)!;
  const b = s.marks.includes(n.id);
  return (
    <article className="mx-auto max-w-3xl">
      <div className="h-56 rounded-2xl bg-gradient-to-br from-lime/25 to-bg2 md:h-72" />
      <p className="mt-6 text-xs text-lime">
        {n.cat} · fictional Indian sports content
      </p>
      <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">{n.title}</h1>
      <p className="mt-2 text-sm text-mute">
        By {n.source} · {n.date} · {n.mins} min read
      </p>
      <div className="mt-4 flex gap-2">
        <Btn
          v="ghost"
          onClick={() => {
            toggle("marks", n.id);
            toast(b ? "Bookmark removed" : "Article saved");
          }}
        >
          {b ? "Saved" : "Save"}
        </Btn>
        <Btn
          v="ghost"
          onClick={() => {
            navigator.clipboard?.writeText(location.href);
            toast("Link copied");
          }}
        >
          Share
        </Btn>
      </div>
      {n.body.map((p, i) => (
        <p key={i} className="mt-5 text-mute">
          {p}
        </p>
      ))}
      <h2 className="mt-10 font-bold">Related Indian athlete</h2>
      <Link
        to={`/app/athletes/${a.id}`}
        className="mt-2 inline-block text-lime"
      >
        {a.name}
      </Link>
      <h2 className="mt-8 font-bold">Related stories</h2>
      <div className="mt-2 space-y-2">
        {news
          .filter((x) => x.id !== n.id && x.cat === n.cat)
          .slice(0, 3)
          .map((x) => (
            <Link
              key={x.id}
              to={`/app/news/${x.id}`}
              className="block text-sm text-mute hover:text-lime"
            >
              {x.title}
            </Link>
          ))}
      </div>
    </article>
  );
}
