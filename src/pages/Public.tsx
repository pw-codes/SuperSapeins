import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { athletes, news, contracts, formatINR } from "../data/mock";
import { Btn, Card, Counter, Photo, Reveal, Demo } from "../components/ui";
import { AthleteCard } from "./Discover";
const nav = [
  ["Discover", "/app/discover"],
  ["Athletes", "/app/discover"],
  ["Marketplace", "/app/market"],
  ["News", "/app/news"],
  ["About", "/about"],
];
function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 md:px-8">
        <Link
          to="/"
          className="text-lg font-extrabold tracking-tight text-lime"
        >
          SUPER SAPIENS
        </Link>
        <nav className="hidden gap-5 text-sm text-mute md:flex">
          {nav.map(([l, t]) => (
            <Link key={l} to={t} className="hover:text-tx">
              {l}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/login" className="text-sm text-mute hover:text-tx">
            Sign In
          </Link>
          <Link to="/signup">
            <Btn>Get Started</Btn>
          </Link>
        </div>
      </div>
    </header>
  );
}
function Foot() {
  return (
    <footer className="mt-24 border-t border-line bg-bg2 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-6 px-4 text-sm text-mute md:px-8">
        <div>
          <p className="font-extrabold text-lime">SUPER SAPIENS</p>
          <p className="mt-1">
            Discover Indian Talent. Track Performance. Shape the Future.
          </p>
          <p className="mt-2 text-xs">
            Prototype with fictional Indian demo data.
          </p>
        </div>
        <div className="flex gap-5">
          {[
            ["About", "/about"],
            ["Terms", "/terms"],
            ["Privacy", "/privacy"],
            ["Sign In", "/login"],
          ].map(([l, t]) => (
            <Link key={l} to={t} className="hover:text-tx">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
export const Page = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Nav />
    {children}
    <Foot />
  </div>
);
export function Landing() {
  const r = useReducedMotion();
  const top = athletes.filter((a) => a.trending);
  return (
    <Page>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-lime/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              The Future of Indian Sports Talent Starts Here.
            </h1>
            <p className="mt-5 max-w-lg text-mute">
              Discover emerging Indian athletes, explore performance insights,
              follow rising stars and experience talent discovery dedicated to
              India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app/discover">
                <Btn>Explore Indian Athletes</Btn>
              </Link>
              <a href="#how">
                <Btn v="ghost">Discover the Platform</Btn>
              </a>
            </div>
          </div>
          <div className="relative h-[380px]">
            {top.slice(0, 3).map((a, i) => (
              <motion.div
                key={a.id}
                animate={r ? {} : { y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + i,
                  ease: "easeInOut",
                }}
                className="absolute w-60"
                style={{ top: i * 110, left: i % 2 ? "38%" : "0" }}
              >
                <Card className="flex items-center gap-3 p-3 shadow-2xl">
                  <Photo a={a} className="h-14 w-14 rounded-xl text-lg" />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{a.name}</p>
                    <p className="text-xs text-mute">{a.sport}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-lime">{a.score}</p>
                    <p className="text-[10px] text-lime">
                      +{Math.abs(a.growth)}%
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4 md:px-8">
        {[
          ["Indian athlete profiles", athletes.length],
          ["Sports covered", SPORTS_COUNT],
          ["Indian states represented", 12],
          ["Sample contracts", contracts.length],
        ].map(([l, n], i) => (
          <Reveal key={String(l)} i={i}>
            <Card className="p-5">
              <p className="text-3xl font-extrabold text-lime">
                <Counter n={Number(n)} />
              </p>
              <p className="text-sm text-mute">{l}</p>
            </Card>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <h2 className="text-2xl font-extrabold md:text-4xl">
          Featured and trending Indian talent
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {athletes
            .slice(0, 3)
            .concat(top.slice(1, 4))
            .map((a) => (
              <AthleteCard key={a.id} a={a} />
            ))}
        </div>
      </section>
      <section id="how" className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <h2 className="text-2xl font-extrabold md:text-4xl">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            [
              "Discover",
              "Search and filter Indian athletes by sport, state, age and career stage.",
            ],
            [
              "Track",
              "Follow athletes and watch performance trends move over time.",
            ],
            [
              "Simulate",
              "Try the rupee-based demo marketplace with virtual funds. No real money is involved.",
            ],
          ].map(([t, d], i) => (
            <Reveal key={t} i={i}>
              <Card className="p-6">
                <h3 className="font-bold">
                  {i + 1}. {t}
                </h3>
                <p className="mt-2 text-sm text-mute">{d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <h2 className="text-2xl font-extrabold md:text-4xl">
          Latest Indian sports news
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {news.slice(0, 3).map((n) => (
            <Link
              key={n.id}
              to={`/app/news/${n.id}`}
              className="rounded-2xl border border-line bg-card p-5 hover:border-lime"
            >
              <p className="text-xs text-lime">{n.cat}</p>
              <p className="mt-2 font-bold">{n.title}</p>
              <p className="mt-1 text-xs text-mute">
                Indian demo content · {n.date}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-extrabold md:text-4xl">
            Marketplace preview
          </h2>
          <Demo />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contracts.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to={`/app/market/${c.id}`}
              className="rounded-2xl border border-line bg-card p-5 hover:border-lime"
            >
              <p className="font-bold">
                {athletes.find((a) => a.id === c.athleteId)?.name}
              </p>
              <p className="text-xs text-mute">
                {c.type} · {c.months} months
              </p>
              <p className="mt-3 text-2xl font-extrabold">
                {formatINR(c.price)}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <h2 className="text-2xl font-extrabold md:text-4xl">
          What early testers say
        </h2>
        <p className="text-xs text-mute">
          Fictional Indian placeholder testimonials.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "Finding Indian talent is finally quick.",
            "The charts make trends easy to read.",
            "The simulated Indian rupee market is safe to learn.",
          ].map((t, i) => (
            <Card key={i} className="p-5 text-sm">
              “{t}”<p className="mt-3 text-xs text-mute">Demo user {i + 1}</p>
            </Card>
          ))}
        </div>
      </section>
    </Page>
  );
}
const SPORTS_COUNT = 8;
const Doc = ({ t, p }: { t: string; p: string[] }) => (
  <Page>
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold">{t}</h1>
      <p className="mt-2 text-xs text-mute">
        Prototype content for SUPER SAPIENS India.
      </p>
      {p.map((x, i) => (
        <p key={i} className="mt-5 text-mute">
          {x}
        </p>
      ))}
    </article>
  </Page>
);
export const About = () => (
  <Doc
    t="About SUPER SAPIENS India"
    p={[
      "SUPER SAPIENS India is a prototype for discovering Indian athletes, tracking performance, sharing Indian sports news and simulating a contract marketplace.",
      "All athletes, statistics, articles and contracts shown are fictional demonstration data.",
      "The marketplace uses virtual Indian rupees only. No payments are taken and nothing is a financial offer.",
    ]}
  />
);
export const Terms = () => (
  <Doc
    t="Terms & Conditions"
    p={[
      "Placeholder terms for acceptable use of SUPER SAPIENS India.",
      "Simulated marketplace terms: demo transactions have no monetary value.",
      "Governance and liability terms must be reviewed for Indian law before launch.",
    ]}
  />
);
export const Privacy = () => (
  <Doc
    t="Privacy Policy"
    p={[
      "In this prototype, preferences are stored only in your browser using localStorage.",
      "This demo does not send account or profile data to a server.",
      "A production Indian launch should review applicable privacy and data protection requirements.",
    ]}
  />
);
