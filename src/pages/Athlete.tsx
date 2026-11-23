import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BadgeCheck, Share2 } from "lucide-react";
import { athletes, news, contracts, seedOf, formatINR } from "../data/mock";
import { useStore } from "../store";
import { Btn, Card, Photo, Tabs, Trend, Demo } from "../components/ui";
export default function Athlete() {
  const { id } = useParams();
  const a = athletes.find((x) => x.id === id);
  const { s, set, toggle, toast } = useStore();
  const [tab, setTab] = useState("Overview");
  useEffect(() => {
    if (a)
      set({
        recent: [a.id, ...s.recent.filter((r) => r !== a.id)].slice(0, 6),
      });
  }, [id]);
  if (!a)
    return (
      <div className="py-20 text-center">
        <p className="font-bold">Talent not found</p>
        <Link to="/app/discover" className="text-lime">
          Back to discovery
        </Link>
      </div>
    );
  const f = s.follow.includes(a.id),
    w = s.watch.includes(a.id),
    sd = seedOf(a.id);
  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <Photo a={a} className="h-56 w-48 rounded-2xl" />
        <div className="flex-1">
          <h1 className="flex items-center gap-2 text-3xl font-extrabold md:text-5xl">
            {a.name}
            {a.verified && (
              <span title="Verified (mock profile)">
                <BadgeCheck className="text-lime" />
              </span>
            )}
          </h1>
          <p className="mt-1 text-mute">
            {a.sport} · {a.position} · {a.country}
          </p>
          <p className="mt-1 text-xs text-mute"></p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Btn
              v={f ? "ghost" : "solid"}
              onClick={() => {
                toggle("follow", a.id);
                toast(f ? "Unfollowed" : "Following");
              }}
            >
              {f ? "Following" : "Follow"}
            </Btn>
            <Btn
              v="ghost"
              onClick={() => {
                toggle("watch", a.id);
                toast(w ? "Removed from watchlist" : "Added to watchlist");
              }}
            >
              {w ? "In watchlist" : "Add to watchlist"}
            </Btn>
            <Btn
              v="ghost"
              onClick={() => {
                navigator.clipboard?.writeText(location.href);
                toast("Profile link copied");
              }}
            >
              <Share2 size={16} />
              Share
            </Btn>
          </div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-extrabold text-lime">{a.score}</div>
          <div className="text-xs text-mute">Performance score</div>
        </div>
      </div>
      <div className="mt-8">
        <Tabs
          tabs={["Overview", "Statistics", "Career", "News", "Contracts"]}
          v={tab}
          set={setTab}
        />
      </div>
      <div className="mt-6">
        {tab === "Overview" && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-5 md:col-span-2">
              <h3 className="font-bold">Biography</h3>
              <p className="mt-2 text-sm text-mute">{a.bio}</p>
              <h3 className="mt-5 font-bold">Recent highlight</h3>
              <p className="mt-2 text-sm text-mute">{a.achievement}</p>
            </Card>
            <Card className="p-5 text-sm">
              {[
                ["Age", a.age],
                ["Stage", a.stage],
                ["Country", a.country],
                ["Growth", `${a.growth}%`],
              ].map(([k, v]) => (
                <div
                  key={String(k)}
                  className="flex justify-between border-b border-line py-2 last:border-0"
                >
                  <span className="text-mute">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </Card>
          </div>
        )}
        {tab === "Statistics" && (
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold">Performance index</h3>
              <Demo />
            </div>
            <Trend seed={sd} />
            <table className="mt-6 w-full text-sm">
              <thead className="text-left text-mute">
                <tr>
                  <th>Season</th>
                  <th>Appearances</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {[2024, 2025, 2026].map((y, i) => (
                  <tr key={y} className="border-t border-line">
                    <td className="py-2">{y}</td>
                    <td>{18 + (sd % 7) + i * 3}</td>
                    <td>{(6 + ((sd + i) % 30) / 10).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        {tab === "Career" && (
          <Card className="space-y-4 p-5">
            {[
              [2024, `Joined ${a.country} development squad`],
              [2025, a.achievement],
              [2026, "Promoted to Indian senior pathway (demo)"],
            ].map(([y, t]) => (
              <div key={y} className="flex gap-4">
                <span className="w-12 font-bold text-lime">{y}</span>
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </Card>
        )}
        {tab === "News" && (
          <div className="space-y-3">
            {news
              .filter((n) => n.athleteId === a.id || n.cat === a.sport)
              .map((n) => (
                <Link
                  key={n.id}
                  to={`/app/news/${n.id}`}
                  className="block rounded-2xl border border-line bg-card p-4 hover:border-lime"
                >
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-xs text-mute">
                    {n.date} · Indian demo content
                  </p>
                </Link>
              ))}
          </div>
        )}
        {tab === "Contracts" && (
          <div className="space-y-3">
            {contracts
              .filter((c) => c.athleteId === a.id)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/app/market/${c.id}`}
                  className="flex justify-between rounded-2xl border border-line bg-card p-4 hover:border-lime"
                >
                  <span>
                    {c.type} · {c.months} months
                  </span>
                  <span>
                    {formatINR(c.price)} <Demo />
                  </span>
                </Link>
              ))}
            {!contracts.some((c) => c.athleteId === a.id) && (
              <p className="text-sm text-mute">
                No sample contracts for this athlete.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
