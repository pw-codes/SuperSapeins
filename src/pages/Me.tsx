import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { athletes, news, notifs, contracts, SPORTS } from "../data/mock";
import { useStore } from "../store";
import {
  Btn,
  Card,
  Counter,
  Field,
  Modal,
  Photo,
  Reveal,
  Toggle,
} from "../components/ui";
import { AthleteCard } from "./Discover";
import { NewsCard } from "./News";
export function Dashboard() {
  const { s } = useStore();
  const h = new Date().getHours();
  const g =
    h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  const stats = [
    ["Athletes followed", s.follow.length],
    ["Watchlist", s.watch.length],
    ["Trending talents", athletes.filter((a) => a.trending).length],
    ["Recent updates", notifs.length],
  ];
  const feed = news
    .filter((n) => s.sports.includes(n.cat))
    .concat(news)
    .slice(0, 3);
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-lime/15 to-card p-6 md:p-8">
        <p className="text-sm text-mute">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">
          {g}, {s.name.split(" ")[0]}.
        </h1>
        <p className="mt-2 text-mute">
          Here’s what moved in the talent you follow.
        </p>
      </Card>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(([l, n], i) => (
          <Reveal key={String(l)} i={i}>
            <Card className="p-5">
              <p className="text-3xl font-extrabold text-lime">
                <Counter n={Number(n)} />
              </p>
              <p className="text-sm text-mute">{l}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="grid gap-4">
        <Card className="p-5">
          <h2 className="font-bold">Watchlist</h2>
          {s.watch.length ? (
            s.watch.map((id) => {
              const a = athletes.find((x) => x.id === id)!;
              return (
                <Link
                  key={id}
                  to={`/app/athletes/${id}`}
                  className="mt-3 flex justify-between text-sm hover:text-lime"
                >
                  <span>{a.name}</span>
                  <span>{a.score}</span>
                </Link>
              );
            })
          ) : (
            <p className="mt-3 text-sm text-mute">
              Nothing here yet. Add athletes from their profile.
            </p>
          )}
        </Card>
      </div>
      <section>
        <h2 className="mb-3 text-xl font-bold">Trending athletes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {athletes
            .filter((a) => a.trending)
            .slice(0, 3)
            .map((a) => (
              <AthleteCard key={a.id} a={a} />
            ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-bold">Personalized news</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {feed.map((n) => (
            <NewsCard key={n.id} n={n} />
          ))}
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-bold">Recently viewed</h2>
          {s.recent.length ? (
            s.recent.map((id) => (
              <Link
                key={id}
                to={`/app/athletes/${id}`}
                className="mt-2 block text-sm text-mute hover:text-lime"
              >
                {athletes.find((a) => a.id === id)?.name}
              </Link>
            ))
          ) : (
            <p className="mt-2 text-sm text-mute">
              Profiles you open will appear here.
            </p>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="font-bold">
            Marketplace highlights{" "}
            <span className="text-xs text-lime">DEMO</span>
          </h2>
          {contracts.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to={`/app/market/${c.id}`}
              className="mt-2 flex justify-between text-sm text-mute hover:text-lime"
            >
              <span>{athletes.find((a) => a.id === c.athleteId)?.name}</span>
              <span>${c.price}</span>
            </Link>
          ))}
        </Card>
      </div>
    </div>
  );
}
export function Collection({
  mode,
}: {
  mode: "watchlist" | "following" | "saved";
}) {
  const { s } = useStore();
  const ids = mode === "watchlist" ? s.watch : s.follow;
  const items = athletes.filter((a) => ids.includes(a.id));
  const arts = news.filter((n) => s.marks.includes(n.id));
  const title = {
    watchlist: "Watchlist",
    following: "Following",
    saved: "Saved articles",
  }[mode];
  return (
    <div>
      <h1 className="text-3xl font-extrabold">{title}</h1>
      {mode === "saved" ? (
        arts.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {arts.map((n) => (
              <NewsCard key={n.id} n={n} />
            ))}
          </div>
        ) : (
          <Empty to="/app/news" t="No saved articles yet" b="Browse news" />
        )
      ) : items.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <AthleteCard key={a.id} a={a} />
          ))}
        </div>
      ) : (
        <Empty
          to="/app/discover"
          t={`Your ${title.toLowerCase()} is empty`}
          b="Discover athletes"
        />
      )}
    </div>
  );
}
const Empty = ({ to, t, b }: { to: string; t: string; b: string }) => (
  <div className="mt-8 rounded-2xl border border-dashed border-line p-12 text-center">
    <p className="font-bold">{t}</p>
    <Link to={to}>
      <Btn className="mt-4">{b}</Btn>
    </Link>
  </div>
);
export function Profile() {
  const { s, set, toast } = useStore();
  const [name, setName] = useState(s.name);
  const [bio, setBio] = useState(s.bio);
  const [edit, setEdit] = useState(false);
  const pick = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      set({ photo: String(r.result) });
      toast("Photo preview updated");
    };
    r.readAsDataURL(f);
  };
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-lime text-3xl font-extrabold text-bg">
          {s.photo ? (
            <img src={s.photo} alt="" className="h-full w-full object-cover" />
          ) : (
            s.name[0]
          )}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">{s.name}</h1>
          <p className="text-mute">{s.bio}</p>
        </div>
        <Btn v="ghost" className="ml-auto" onClick={() => setEdit(!edit)}>
          {edit ? "Cancel" : "Edit profile"}
        </Btn>
      </div>
      {edit && (
        <Card className="mt-6 max-w-md space-y-4 p-5">
          <Field
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Field
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <label className="block text-sm text-mute">
            Photo preview
            <input
              type="file"
              accept="image/*"
              className="mt-1 w-full"
              onChange={(e) => pick(e.target.files?.[0])}
            />
          </label>
          <Btn
            onClick={() => {
              if (!name.trim()) return toast("Name can’t be empty", true);
              set({ name, bio });
              setEdit(false);
              toast("Profile saved");
            }}
          >
            Save changes
          </Btn>
        </Card>
      )}
      <h2 className="mt-8 font-bold">Favourite sports</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {SPORTS.map((x) => (
          <button
            key={x}
            onClick={() =>
              set({
                sports: s.sports.includes(x)
                  ? s.sports.filter((y) => y !== x)
                  : [...s.sports, x],
              })
            }
            className={`rounded-full border px-4 py-1.5 text-sm ${s.sports.includes(x) ? "border-lime bg-lime text-bg" : "border-line text-mute"}`}
          >
            {x}
          </button>
        ))}
      </div>
      <h2 className="mt-8 font-bold">Activity</h2>
      <Card className="mt-2 divide-y divide-line text-sm">
        {[
          `Following ${s.follow.length} athletes`,
          `${s.watch.length} on watchlist`,
          `${s.marks.length} saved articles`,
          `${s.tx.length} simulated orders`,
        ].map((t) => (
          <p key={t} className="p-4">
            {t}
          </p>
        ))}
      </Card>
    </div>
  );
}
export function Notifications() {
  const { s, set } = useStore();
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Notifications</h1>
        <Btn v="ghost" onClick={() => set({ readN: notifs.map((n) => n.id) })}>
          Mark all read
        </Btn>
      </div>
      <div className="mt-6 space-y-2">
        {notifs.map((n) => {
          const r = s.readN.includes(n.id);
          return (
            <button
              key={n.id}
              onClick={() => !r && set({ readN: [...s.readN, n.id] })}
              className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-sm ${r ? "border-line text-mute" : "border-lime/40 bg-card"}`}
            >
              {!r && <span className="h-2 w-2 rounded-full bg-lime" />}
              <span className="flex-1">{n.t}</span>
              <span className="text-xs text-mute">{n.w}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export function Settings() {
  const { s, set, toast } = useStore();
  const nav = useNavigate();
  const [out, setOut] = useState(false);
  const [pw, setPw] = useState("");
  return (
    <div className="max-w-xl space-y-8">
      <h1 className="text-3xl font-extrabold">Settings</h1>
      <section>
        <h2 className="font-bold">Notifications</h2>
        <div className="divide-y divide-line">
          <Toggle
            label="Email updates"
            on={s.prefs.email}
            set={(b) => set({ prefs: { ...s.prefs, email: b } })}
          />
          <Toggle
            label="Push notifications"
            on={s.prefs.push}
            set={(b) => set({ prefs: { ...s.prefs, push: b } })}
          />
          <Toggle
            label="Weekly digest"
            on={s.prefs.digest}
            set={(b) => set({ prefs: { ...s.prefs, digest: b } })}
          />
        </div>
      </section>
      <section>
        <h2 className="font-bold">Appearance</h2>
        <select
          className="mt-2"
          value={s.density}
          onChange={(e) => set({ density: e.target.value })}
        >
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </select>
        <p className="mt-1 text-xs text-mute">
          Dark theme only in this prototype.
        </p>
      </section>
      <section>
        <h2 className="font-bold">Privacy</h2>
        <Toggle
          label="Public profile"
          on={s.pub}
          set={(b) => set({ pub: b })}
        />
      </section>
      <section>
        <h2 className="font-bold">Security</h2>
        <div className="mt-2 max-w-xs space-y-3">
          <Field
            label="New password"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <Btn
            v="ghost"
            onClick={() =>
              pw.length < 8
                ? toast("Use at least 8 characters", true)
                : (setPw(""), toast("Password updated (demo, not stored)"))
            }
          >
            Update password
          </Btn>
        </div>
      </section>
      <Btn v="ghost" onClick={() => setOut(true)}>
        Log out
      </Btn>
      <Modal open={out} onClose={() => setOut(false)} title="Log out?">
        <p className="text-sm text-mute">You can sign back in any time.</p>
        <div className="mt-5 flex gap-2">
          <Btn onClick={() => nav("/")}>Log out</Btn>
          <Btn v="ghost" onClick={() => setOut(false)}>
            Stay
          </Btn>
        </div>
      </Modal>
    </div>
  );
}
