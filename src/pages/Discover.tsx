import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Trophy, LayoutGrid, List } from "lucide-react";
import {
  athletes,
  Athlete,
  SPORTS,
  TALENT_CATEGORIES,
  INDIAN_STATES,
} from "../data/mock";
import { useStore } from "../store";
import { Btn, Photo } from "../components/ui";
export function AthleteCard({
  a,
  list = false,
}: {
  a: Athlete;
  list?: boolean;
}) {
  const { s, toggle, toast } = useStore();
  const f = s.follow.includes(a.id);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group overflow-hidden rounded-2xl border border-line bg-card ${list ? "flex" : ""}`}
    >
      <Link
        to={`/app/athletes/${a.id}`}
        className={`block overflow-hidden ${list ? "w-36 shrink-0" : "aspect-[4/3]"}`}
      >
        <Photo
          a={a}
          className="h-full w-full transition duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="flex-1 p-4">
        <div className="flex justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-1 font-bold">
              {a.name}
              {a.verified && <BadgeCheck size={15} className="text-lime" />}
            </h3>
            <p className="text-xs text-mute">
              {a.sport} · {a.position} · {a.state}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-extrabold text-lime">{a.score}</div>
            <div
              className={`text-xs ${a.growth >= 0 ? "text-lime" : "text-red-400"}`}
            >
              {a.growth >= 0 ? "+" : ""}
              {a.growth}%
            </div>
          </div>
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs text-mute">
          <Trophy size={12} />
          {a.achievement}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Btn
            v={f ? "ghost" : "solid"}
            className="!px-3 !py-1.5"
            onClick={() => {
              toggle("follow", a.id);
              toast(f ? `Unfollowed ${a.name}` : `Following ${a.name}`);
            }}
          >
            {f ? "Following" : "Follow"}
          </Btn>
          <Link
            className="text-sm font-semibold text-lime"
            to={`/app/athletes/${a.id}`}
          >
            View profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
export default function Discover() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "";
  const [f, setF] = useState({
    category: "",
    sport: "",
    state: "",
    age: "",
    stage: "",
    trend: false,
  });
  const [sort, setSort] = useState("score");
  const [list, setList] = useState(false);
  const [n, setN] = useState(9);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoad(false), 500);
    return () => clearTimeout(t);
  }, []);
  const res = useMemo(
    () =>
      athletes
        .filter(
          (a) =>
            (!q ||
              `${a.name} ${a.sport} ${a.category} ${a.state} ${a.position}`
                .toLowerCase()
                .includes(q.toLowerCase())) &&
            (!f.category || a.category === f.category) &&
            (!f.sport || a.sport === f.sport) &&
            (!f.state || a.state === f.state) &&
            (!f.stage || a.stage === f.stage) &&
            (!f.trend || a.trending) &&
            (!f.age ||
              (f.age === "U20"
                ? a.age < 20
                : f.age === "20-24"
                  ? a.age >= 20 && a.age < 25
                  : a.age >= 25)),
        )
        .sort((x, y) =>
          sort === "name"
            ? x.name.localeCompare(y.name)
            : sort === "growth"
              ? y.growth - x.growth
              : y.score - x.score,
        ),
    [q, f, sort],
  );
  const sel = (k: string, o: string[], l: string) => (
    <select
      aria-label={l}
      value={(f as any)[k]}
      onChange={(e) => setF({ ...f, [k]: e.target.value })}
    >
      <option value="">{l}</option>
      {o.map((x) => (
        <option key={x}>{x}</option>
      ))}
    </select>
  );
  return (
    <div>
      <h1 className="text-3xl font-extrabold md:text-5xl">
        Discover Extraordinary Talent.
      </h1>
      <p className="mt-3 max-w-2xl text-mute">
        Explore emerging creators and performers across sports, dance, music,
        visual arts, media and more.
      </p>
      <input
        list="sugg"
        value={q}
        onChange={(e) => setSp(e.target.value ? { q: e.target.value } : {})}
        placeholder="Search by name, talent, category or state"
        className="mt-6 w-full !rounded-2xl !py-4 text-base"
      />
      <datalist id="sugg">
        {athletes.slice(0, 12).map((a) => (
          <option key={a.id} value={a.name} />
        ))}
      </datalist>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {["", ...TALENT_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setF({ ...f, category: c, sport: "" })}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${f.category === c ? "border-lime bg-lime text-bg" : "border-line text-mute"}`}
          >
            {c || "All talents"}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {[
          "",
          ...SPORTS.filter(
            (s) =>
              !f.category ||
              athletes.some((a) => a.category === f.category && a.sport === s),
          ),
        ].map((s) => (
          <button
            key={s}
            onClick={() => setF({ ...f, sport: s })}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${f.sport === s ? "border-lime bg-lime text-bg" : "border-line text-mute"}`}
          >
            {s || "All disciplines"}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {sel("state", INDIAN_STATES, "Indian state / Union Territory")}
        {sel("age", ["U20", "20-24", "25+"], "Age group")}
        {sel("stage", ["Youth", "Emerging", "Professional"], "Career stage")}
        <label className="flex items-center gap-2 text-sm text-mute">
          <input
            type="checkbox"
            checked={f.trend}
            onChange={(e) => setF({ ...f, trend: e.target.checked })}
          />
          Trending only
        </label>
        <select
          aria-label="Sort"
          className="ml-auto"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="score">Top score</option>
          <option value="growth">Fastest growth</option>
          <option value="name">Name A–Z</option>
        </select>
        <button
          aria-label="Toggle view"
          onClick={() => setList(!list)}
          className="rounded-xl border border-line p-2"
        >
          {list ? <LayoutGrid size={18} /> : <List size={18} />}
        </button>
      </div>
      <p className="mt-4 text-sm text-mute">
        {res.length} talents · fictional demo profiles
      </p>
      {load ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : res.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center">
          <p className="font-bold">No talents match these filters</p>
          <p className="mt-1 text-sm text-mute">
            Remove a filter or search for a different name or discipline.
          </p>
          <Btn
            className="mt-4"
            onClick={() => {
              setF({
                category: "",
                sport: "",
                state: "",
                age: "",
                stage: "",
                trend: false,
              });
              setSp({});
            }}
          >
            Clear filters
          </Btn>
        </div>
      ) : (
        <>
          <div
            className={`mt-4 grid gap-4 ${list ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}
          >
            {res.slice(0, n).map((a) => (
              <AthleteCard key={a.id} a={a} list={list} />
            ))}
          </div>
          {n < res.length && (
            <div className="mt-8 text-center">
              <Btn v="ghost" onClick={() => setN(n + 9)}>
                Load more
              </Btn>
            </div>
          )}
        </>
      )}
    </div>
  );
}
